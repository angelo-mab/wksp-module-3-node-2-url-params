# 3.2.0 - Review concepts

---

## EJS

- What's the difference between these two?

```js
<%- myVar %>
//puts the html tags, malicious script goes through
<%= myVar %>
//.toString, everything that is passed through is just a string
```

_...Why do we have two options?_

---

What is this for?

```js
<%- include('<PATH_TO_EJS_FILE', {}) %>
//itll grab what is at the end path
```

_...What makes this so powerful?_
//everything passed into the {} are variable. it has access to the variable

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example
<ul>
    [<% array.forEach(element => { %>
        <li>element</li>
  <%>  });%>
</ul>
```

---

## Express

- What express _routing method_ did we use yesterday?
- What are its parameters?
- What is the minimum amount of code to set up an express server?

```js
// Example
                app.get (get information)
parameters:     app.get(path, function(request, response) {})

```

---