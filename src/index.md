---
name: Home
layout: home.html
images:
 - http://placekitten.com/1500/3000
 - http://placekitten.com/2000/4000
intro_text:  |
 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
---

<p>hello world!</p>

{{#if images}}
<ul>
{{#each images}}
<li>
<img src="{{this}}" />
</li>
{{/each}}
<ul>
{{/if}}