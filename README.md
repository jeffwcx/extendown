# Extendown
## extendable markdown compiler


## Features

+ Extenable
+ Github Mardown Syntax 

## Basic Syntax

Refer to Github Markdown

### Headers
```
# This is a <h1> tag
## This is a <h2> tag
###### This is a <h6> tag
```
translate to

```
<h1>This is a &lt;h1&gt; tag</h1>
<h2>This is a &lt;h2&gt; tag</h2>
```

### Emphasis


```
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_
```
translate to

```
<em>This text will be italic</em>
<em>This will also be italic</em>
<strong>This text will be bold</strong>
<strong>This will also be bold</strong>
<em>You <strong>can<strong> combine them</em>
```

### Strikethrough

```
~~This was mistaken text~~
```
translate to

```
<span style="text-decoration:line-through"></span>
```
~~This was mistaken text~~

### SplitLine

```
* * *
**
***
*******
-----------
```
translate to

```
<hr></hr>
**
<hr></hr>
<hr></hr>
<hr></hr>
```


### QuotingText

```
> QuotingText
```

translate to
```
<blockquote><p>QuotingText</p></blockquote>
```
### QuotingCode

````
`inline code`
``inline ` code``

```
block code
```
````
translate to

```
<code>inline code</code>
<code>inline ` code</code>
<pre><code>block code</code></pre>
```

### Links

```
[link](www.google.com)


[link](www.google.com "Title")

[1]: <http://google.com/> "Google"
[Google Search][1]

[google]: <http://google.com/> "Google"
[google]: http://google.com/ 'Google'
[google]: http://google.com/ (Google)
[google][]

```
translate to
```
<a href="www.google.com">link<a>
<a href="www.google.com" title="Title">link<a>

<a href="http://google.com/" title="Google">Google Search</a>

<a href="http://google.com/" title="Google">google</a>

```

### Image

```
![Alt Text](/path/to/img.jpg)
```
translate to 
```
<img src="/path/to/img.jpg" alt="Alt Text" />
```


### List

 1. item 
 2. item
    1. item
    2. item

```
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
+ Red
- Green
* Blue


1. Red

2. Me

1. Red

    Me

2. Red  (two spaces)
Me

3. Code

        var a = 1 

4. Block
    
    > quote



```

translate to

```
<ol>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ol>

<ul>
<li>Red</li>
<li>Green</li>
<li>Blue</li>
</ul>

<ol>
<li>
    <p>Red</p>
</li>
<li>
    <p>Me</p>
</li>
<li>
    <p>Red</p>
    <p>Me</p>
</li>
<li>
    <p>Red<br />Me</p>
</li>
<li>
    <p>Code</p>
    <pre>
        <code>var a = 1<code>
    </pre>
</li>
<li>
    <p>Block</p>
    <blockquote>
        <p>quote</p>
    </blockquote>
</li>
</ol>
```

> notes  
1 indent = 4 spaces  = 1 tab


### Task list

```
- [x] Finished
- [ ] Not Finished
```
translate to

```
<ul>
<li>
<input type="checkbox" checked disabled />
Finished
</li>
<li>
<input type="checkbox" disabled />
Not Finished
</li>
</ul>

```


### Tables

include a blank line before your table

There must be at least three hyphens in each column of the header row
```
| First Header | Second Header | 
| --- | --- |
| Content Cell | Content Cell  |

| First Header | Center Header | Second Header | 
| :--- | :---: | ---: |
| Content Cell | Content Cell  | Content Cell  |

```
translate to

```
<table>
    <thead>
        <tr>
            <th>First Header</th>
            <th>Second Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Content Cell</td>
            <td>Content Cell</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th align="left">First Header</th>
            <th align="center">Center Header</th>
            <th align="right">Second Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="left">Content Cell</td>
            <td align="center">Content Cell</td>
            <td align="right">Content Cell</td>
        </tr>
    </tbody>
</table>



```



### Emoji

```
:+1:
```
translate to

```
<img alt=":+1:" width="20" height="20" src="emoji-img-path">
```

refer to [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)


### IgnoreFormat

You can use `` \ `` to Ignore Mardown Character

```
\*literal asterisks\*

```
translate to 
```
*literal asterisks*
```


## refenrence
+ [Markdown: Syntax](http://daringfireball.net/projects/markdown/syntax)

+ [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax)



