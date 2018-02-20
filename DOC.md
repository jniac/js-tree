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
.isParentOf(node)
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
.printLine()           // "  │ └─── Node#2 {}"   
.print()
```

```
"──┬─ Node#0 {}
  ├─┬─ Node#1 {}
  │ └─── Node#2 {}
  └─── Node#3 {}"
``` 