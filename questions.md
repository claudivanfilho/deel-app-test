#### Question 1

The difference is that Pure components will not re-renders if your props are the same as the previous time.

As an example of how this can break the App, let assume a component which renders a really large amount of data, but this data will not change during the user interaction. If I use Pure comopnent in this case the component will only renders once despite the parent state changes. But if I use a normal Component to renders this large CPU consuming element my browser can crash after a certain numbers os state changes in the parent.

#### Question 2

This can be problematic because if I use the ShouldComponentUpdate lifecycle function to define that the component should not render, it will also affect the component's children, which may be using a state of an upper Context to re-renders and therefore must be re-renders even if the father has ShouldComponentUpdate returning false.

#### Question 3

1 - You can pass information using a callback function passed through the props

2 - You can pass using a state management system. Redux/Context API

#### Question 4

1 - Using pure components
2 - Using ShouldComponentUpdate method in Class components

#### Question 5

Fragments are used to avoid unnecessary divs or other elements.

If your compoent must return two elements, but without a div encapsulation then like this `return <label>Name</label><input />` your App will crash because a react component must return a single Node. So this is the case when we need to use fragments.

### Question 6

```js
function Library({books}) {
  return <div>{books}</div>;
}

function withBooks(WrappedComponent) {

  const [books, setBooks] = useState([]);

  // from react Context
  useEffect(() => {
    // fetch books and set in the state ...
  })

  return (props) <WrappedComponent {...props} books={books} />
}

export LibraryWithBooks = withBooks(Library)
```

```js
function Header() {
  return <div>Header</div>;
}

function withIntl(WrappedComponent) {
  // from react Context
  const {intl} = useIntl()

  return (props) <WrappedComponent {...props} intl={intl} />
}

export HeaderWithIntl = withIntl(Header)
```

```js
function Header() {
  return <div>Header</div>;
}

function withLocate(WrappedComponent) {
  // from react Context
  const {locale} = useLocale()

  return (props) <WrappedComponent {...props} intl={locale} />
}

export HeaderWithLocale = withLocate(Header)
```

#### Question 7

In promisses and callbacks you treat the exceptions asynchronously. Using async/wait you treat synchronously.

#### Question 8

2 arguments (one to indicate the new state and another optional one to store a callback to be executed after the update) It's async for performance purposes, because the react will batch all the setState and apply in a single render.

#### Question 9

- If the Class component has state, change it to use hooks instead.
- Change the Class component lifycycle event with the funcional alternative. componentDidMount -> useEffect for example.
- Convert all React.PureComponent to React.memo alternative

#### Question 10

- You can use inline css

```
<div style={{width: '100px'}}>Test</div>
```

- You can use preprocessors like SASS, LESS, SCSS.

- You can use a css file and import in your component.

- You can style the component using javascript.

```
doucment.getElementById('test').style.color = 'blue'

return <div id="test">Test</div>
```

- You can use Styled Components or a utility first CSS framework like TailwindCSS

##### Question 11

It can be used the attribute `dangerouslySetInnerHTML` but It's necessary to purify the string before to avoid security issues, for this job I like to use the [DOMPurify](https://github.com/cure53/DOMPurify) library

```html
<div dangerouslySetInnerHTML="{{" __html: DOMPurify.sanitize(myHtmlString) }} />
```
