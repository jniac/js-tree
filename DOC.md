# Class Members

*hierarchy properties*
```
.root
.parent
.firstchild
```

*hierarchy methods*
```
.append(node)
.remove(node)
.removeAll()
.detach()
```

*recursive*
```
.walk(function(node) { ... })
```

*test*
```
.isDetached()
.contains(node)
.isChildOf(node)
```

*iterators*
```
.\*[Symbol.iterator]()  // iterate own children
.\*allChildren()        // iterate all children (own children & children of children)
.\*allParents()
```

*utils*
```
.toGraphStringLine()           // "  │ └─── Node#2 {}"   
.toGraphString()
```

```
"──┬─ Node#0 {}
  ├─┬─ Node#1 {}
  │ └─── Node#2 {}
  └─── Node#3 {}"
``` 
