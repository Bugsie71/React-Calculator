# React Calculator

Basic Calculator build with React.  
Includes input error prevention.

If anyone can figure out why adding keyboard input just doesn't work please let me know.  
Here's the code I tried:

```javascript
useEffect(() => {
  document.addEventListener("keydown", (e) => {
    if (keys.includes(e.key)) processInput(e.key);
  });
}, []);
```

### Libraries Used:

- Mathjs

Thank you!
