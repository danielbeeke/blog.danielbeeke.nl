---
title: RDF; data and schema in one
serie: Building a webapplication on top of RDF
serie-index: 1
date: 2021-03-03
layout: post.hbs
---

### A thought exercise:

>  What if you could give the link of a cake recipe, to the website of your local supermarket and it would show all the products that you would need to bake that cake?

How would such a thing work? What components would you need?

- Universal resource identifiers (The recipe and the supermarket are 'connected' at some level)
- A way to extract detailed data from a recipe URL (Parsing meta data from a page)
- A supermarket that has each of their products linked to a universal known page of the specific ingredient
- A data format that allows for interoperatability
- A bit of software that does this all for you when you paste the link

A lot of this already exists in the ecosystem of RDF. Not all, unfortunately. It is very hard to have local businesses play their part in this interoperability thing. However this article is about technical things and not about political systems.

### A bit more to sparkle the imagination
Here is a small piece of a presentation [Ruben Verborgh](https://ruben.verborgh.org/) gave. It shows one query that is executed on multiple sources where it joins the data of those sources to get the wanted results.

<iframe src="https://www.youtube.com/embed/LUF7plExdv8?start=301&end=360" allowfullscreen></iframe>

### A relational database background

Coming from a relational database background I was used to tables and columns defined in schema's. Well proven technology. I come from a Drupal background. Lot's of big databases. One of the downsides of these relational databases is that the data is locked inside the system. It is tied to the schema's. Without the schema's your data is missing a lot of meaning. Just having some numbers, a bit of text and some booleans does not mean a lot. The property name is really important.

You can not easily email a slice of the data without sending the schema's. In the relational database paradigm you have to include the schema's. 
What if you could have these schema's included in the data in the first place? But maybe at a different level?

### Onto triples

Let's make a jump to triples. Triples are the basis of RDF data. Everything in RDF is composed of triples. Just three core elements. 

The __subject__, the __predicate__ and the __object__. 

For me these three were difficult to grasp at the beginning. I will try may best to explain them in small steps to you. So let us start very simple:

We have a person, named John Doe, who is 51 years old. He will be our test subject.

#### 1. Let's start by listing the properties in a table:

|                   |                   |                   |
|-------------------|-------------------|-------------------|
| John Doe          | givenName         | John              |
| John Doe          | familyName        | Doe               |
| John Doe          | age               | 51                |

Maybe you are thinking, that is a bit of duplicate data just to show some information about John Doe. True, but it will prove to be very flexible and usable for complex systems. What we are having are pieces of a graph. More on that later.

#### 2. Giving things a name
We have a __subject__: 'John Doe' and we have a couple of __objects__: John, Doe and 51. And those __predicate__ something about John Doe. 

| Subject           | Predicate         | Object            |
|-------------------|-------------------|-------------------|
| John Doe          | givenName         | John              |
| John Doe          | familyName        | Doe               |
| John Doe          | age               | 51                |

#### 3. Global unique identifiers

Let's get one step further towards real RDF data. Every 'thing' in RDF has an URI (Uniform resource identifier). It looks like an URL. So with that, John Doe will become: <http://example.com/JohnDoe>. A great thing about URL's is that they are unique. 

Maybe you start thinking, could it...? Yes indeed, this uniqueness is used for joining data sources, but more on that later. Let's focus back to the triples:

Now we have:

| Subject                       | Predicate         | Object            |
|-------------------------------|-------------------|-------------------|
| <http://example.com/JohnDoe>  | givenName         | John              |
| <http://example.com/JohnDoe>  | familyName        | Doe               |
| <http://example.com/JohnDoe>  | age               | 51                |

#### 4. Data types

Let's explain that John is a piece of text, a string literal.

| Subject                       | Predicate         | Object            |
|-------------------------------|-------------------|-------------------|
| <http://example.com/JohnDoe>  | givenName         | "John"            |
| <http://example.com/JohnDoe>  | familyName        | "Doe"             |
| <http://example.com/JohnDoe>  | age               | 51                |

Lets step out of the table structure, we were talking about a graph and not a relational database. 

```turtle
<http://example.com/JohnDoe>  givenName  "John"
<http://example.com/JohnDoe>  familyName "Doe"
<http://example.com/JohnDoe>  age         51
```

#### 5. Data and schema in one

Here comes the great thing. The twist, turning things inside out. The predicate should also be an URI. So it will become:

```turtle
<http://example.com/JohnDoe>  <http://xmlns.com/foaf/0.1/givenName>   "John"
<http://example.com/JohnDoe>  <http://xmlns.com/foaf/0.1/familyName>  "Doe"
<http://example.com/JohnDoe>  <http://xmlns.com/foaf/0.1/age>          51
```

This is a bit hard to read, so let's switch to something more readable called turtle.

#### 6. Human readable data

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix ex: <http://example.com/> .

ex:JohnDoe
	foaf:givenName "John" ;
	foaf:familyName "Doe" ;
	foaf:age 51 .
```

So what happened here? And what really is the twist? The text you see is in turtle format. It is a human readable RDF format. Within RDF it is quite common to transform from one format to another. Some formats are easy to read for machines, others are easy to read for humans.

The '@prefix' lines are aliases. With this we can reuse the label 'foaf' and each time it is used, replace it with: http://xmlns.com/foaf/0.1/. It makes it a lot more readable. 

### About ontologies

But what is foaf? Foaf stands for 'Friend of a Friend' and it is called an ontology. We could see this ontology as a place of properties with their definitions. Something like schema's. Well, the advise is that these predicates should resolve to some kind of documentation. 

So if you would go to http://xmlns.com/foaf/0.1/ it gives you a documentation page. 

To be honest foaf is not that nice because somehow going to http://xmlns.com/foaf/0.1/familyName does not directly link to the familyName section. But anyways, let's check a different ontology. 

[Schema.org](https://schema.org/) maybe you have heard of it. People use it to enrich there search engine snippets / previews. It is an ontology describing almost everything there is. For example a [book](https://schema.org/Book) or a [car](https://schema.org/Car).

### Final thoughts

I hope you found this useful. I would like to see more developers using RDF so we can have more interoperability. This article was the first one in a series called "Building a webapplication on top of RDF". I will be writing about all the things you will encounter trying to create an application on top of RDF. If you have things you would like to see, or if you have remarks, you can mail me at mail@danielbeeke.nl.