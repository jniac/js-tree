# js-tree
Minimal code to implement a tree (graph) in javascript (es2015)  
```
──┬─ Node#0 {}
  ├─┬─ Node#1 {}
  │ └─── Node#2 {}
  └─── Node#3 {}
```

## Features:  
- iteration: 
```javascript
for (let child of parentNode) 
    ...
```
- deep iteration: 
```javascript
for (let anyChild of parentNode.allChildren()) 
    ...
```
- chain style & easy one-or-several methods : 
```javascript
node
    .append(new Node(), new Node(), new Node())
    .appendTo(anotherNode)
```
- *reversible point of view*:
```javascript
node.append(anotherNode) 
// ===
anotherNode.appendTo(node)

node.remove(anotherNode) 
// ===
anotherNode.detach() 
```
- graph view:
```javascript
console.log(node.print())
```



**QUESTION:**  
Should node methods be available for existing objects / classes?  
eg: 
```javascript
Node.implementNode(MyClass)
let myInstance = new MyClass()
myInstance.appendTo(myNode)
```

## basic usage
example:

```javascript
import { Node } from './node.js'

let n1 = new Node({ name: 'node 1' })
let n2 = new Node({ name: 'node 2' })
let n3 = new Node()
let n4 = new Node({ name: 'may the forth be with you'})

n1.append(n2)
n1.append(n3)
n1.append(n4)

n1.remove(n3) // === n3.detach()

n3.appendTo(n2) // === n2.append(n3)

for (let child of n1)
  console.log(child.name)
  
/* output

"node 2"
"may the forth be with you"

*/

console.log(n1.print())

/* output:

──┬─ Node#0 {}
  ├─┬─ Node#1 {}
  │ └─── Node#2 {}
  └─── Node#3 {}
  
*/

```

more complex graph (drawing hierarchy test):
```javascript
n2.append(new Node().append(new Node()).append(new Node().append(new Node().append(new Node())).append(new Node()).append(new Node().append(new Node()))))
n2.append(new Node(), new Node(), new Node())

console.log(n1.print())

/* ouput:

──┬─ Node#0 {}
  ├─┬─ Node#1 {}
  │ ├─── Node#2 {}
  │ ├─┬─ Node#4 {}
  │ │ ├─── Node#5 {}
  │ │ └─┬─ Node#6 {}
  │ │   ├─┬─ Node#7 {}
  │ │   │ └─── Node#8 {}
  │ │   ├─── Node#9 {}
  │ │   └─┬─ Node#10 {}
  │ │     └─── Node#11 {}
  │ ├─── Node#12 {}
  │ ├─── Node#13 {}
  │ └─── Node#14 {}
  └─── Node#3 {}
  
*/
```
