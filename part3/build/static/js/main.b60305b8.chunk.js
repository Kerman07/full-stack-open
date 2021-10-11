(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(15),u=t.n(r),c=t(3),o=t(2),a=t(0),i=function(e){var n=e.onChange,t=e.value;return Object(a.jsx)("input",{onChange:n,value:t})},s=function(e){var n=e.message;return n===[null,null]?null:Object(a.jsx)("div",{className:n[1],children:n[0]})},l=function(e){var n=e.person,t=e.deletePerson;return Object(a.jsxs)("div",{children:[n.name," ",n.number," ",Object(a.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},d=function(e){var n=e.persons,t=e.newFilter,r=e.deletePerson;return n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(a.jsx)(l,{person:e,deletePerson:r},e.name)}))},j=function(e){var n=e.handleNewEntry,t=e.handleName,r=e.handleNumber,u=e.newName,c=e.newNumber;return Object(a.jsxs)("form",{onSubmit:n,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{onChange:t,value:u})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{onChange:r,value:c})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},b=t(4),f=t.n(b),h="/api/persons",m={getAll:function(){return f.a.get(h).then((function(e){return e.data}))},create:function(e){return f.a.post(h,e).then((function(e){return e.data}))},deletePerson:function(e){return f.a.delete("".concat(h,"/").concat(e))},updatePerson:function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))}},O=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],u=Object(o.useState)(""),l=Object(c.a)(u,2),b=l[0],f=l[1],h=Object(o.useState)(""),O=Object(c.a)(h,2),p=O[0],v=O[1],w=Object(o.useState)(""),x=Object(c.a)(w,2),g=x[0],N=x[1],P=Object(o.useState)([null,null]),C=Object(c.a)(P,2),k=C[0],y=C[1];Object(o.useEffect)((function(){m.getAll().then((function(e){r(e)}))}),[]);return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(s,{message:k}),"filter shown with ",Object(a.jsx)(i,{onChange:function(e){return N(e.target.value)},value:g}),Object(a.jsx)("h3",{children:"Add a new entry"}),Object(a.jsx)(j,{handleNewEntry:function(e){e.preventDefault();var n={name:b,number:p},u=t.find((function(e){return e.name===b}));u?window.confirm("".concat(b," is already added to the phonebook, replace the old number with a new one ?"))&&m.updatePerson(u.id,n).then((function(e){y(["Updated the number of ".concat(e.name),"success"]),setTimeout((function(){return y([null,null])}),5e3),r(t.map((function(n){return n.name===b?e:n}))),f(""),v("")})).catch((function(e){y([e.response.data.error,"failure"]),setTimeout((function(){return y([null,null])}),5e3)})):m.create(n).then((function(e){y(["Added ".concat(e.name),"success"]),setTimeout((function(){return y([null,null])}),5e3),r(t.concat(e)),f(""),v("")})).catch((function(e){y([e.response.data.error,"failure"]),setTimeout((function(){return y([null,null])}),5e3)}))},handleName:function(e){return f(e.target.value)},handleNumber:function(e){return v(e.target.value)},newName:b,newNumber:p}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(d,{persons:t,newFilter:g,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&m.deletePerson(e.id).then((function(){r(t.filter((function(n){return n.id!==e.id})))}))}})]})};t(40);u.a.render(Object(a.jsx)(O,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.b60305b8.chunk.js.map