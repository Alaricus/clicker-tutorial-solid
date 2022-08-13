# Clicker Game Tutorial
## The Introduction
**Note:** This is a Solid version of a [similar tutorial](https://github.com/Alaricus/clicker-tutorial-react) that I created for React in 2020. The original purpose of the React tutorial was to demonstrate how one could get `useInterval` to play nicely with the new (at the time) React hooks. This one, on the other hand, is the result of me wanting to play with Solid and be able to compare my experience to something that I was already familiar with.

Let’s say you get inspired by Cookie Clicker and decide to make your own game. Yea, this sort of stuff happens, believe it or not; it happened to me. In this article I’ll talk about the basics of building such a game and go over a relatively simple example of what a game like this might look like.

In order to benefit the most from the code we will be looking over later in the article, it would be helpful if you were familiar with JavaScript at an intermediate level. Typescript knowledge would benefit you as well, but we won't be using any advanced or complicated bits, so it shouldn't prove much of a hinderance if you haven't dealt with it before.

In terms of Solid, we'll be making use of the following list of features: [signals](https://www.solidjs.com/tutorial/introduction_signals), [stores](https://www.solidjs.com/tutorial/stores_createstore), [onCleanup](https://www.solidjs.com/tutorial/lifecycles_oncleanup), [For](https://www.solidjs.com/tutorial/flow_for), and [Show](https://www.solidjs.com/tutorial/flow_show). Follow these links to gain brief familiarity. That's all you'll need.

## The Setup
Clone this repo.

If you don't want to clone and would rather trace each step from scratch, you can get up and running by creating your Solid project via the following command in your terminal:

```
npx degit solidjs/templates/ts clicker-tutorial-solid
```

If you'd rather not deal with Typescript right now, then run this command (notice `js` instead of `ts` at the end):

```
npx degit solidjs/templates/js clicker-tutorial-solid
```

Take a look in your `package.json` and you'll notice that there's only one dependency (`solid`) and a few dev-dependencies: `typescript`, `vite`, and `vite-plugin-solid`. That's fewer than what I have in my repo because I added several dev-dependencies for linting, and one for publishing to GitHub pages.

### To start locally
Install dependencies and run the project:

```
yarn
yarn start
```

or

```
npm i
npm start
```

## The Plan
We can begin by outlining the idea of what we want to end up with. Since this is just a tutorial, we want to build a clicker game that:

1. Allows a user to click a button to increment a counter
2. Allows a user to buy autoclickers to increment a counter automatically
3. Has several levels of autoclickers, each progressively more expensive and powerful

We will inevitably find ourselves adding new features as we go, but it’s still good to have a list of the features that are absolutely required. For those curious to see the end result before diving in, here is a [working example](https://alaricus.github.io/clicker-tutorial-solid/) of the game we are going to build. Here is the [source code](https://github.com/Alaricus/clicker-tutorial-solid). The rest of the article will be an explanation of technical decisions that took us from a plan to the finished product.

## The Execution
### The State
At this point we can create the initual values for the state of our application.

1. `initialClicksValue` — a number. It will start at 0 and then increase as the game progresses. Since it's just a zero, why don't we just supply it when we create our signal that will store and update it? Well, we'll actually want to keep two separate signals. `clicks` for the currently available currency and `netWorth` for the total amount of currency we've ever produced (including what we've spent on autoclickers). Both will start with the value of 0 but then diverge. Instead of feeding these signals magic numbers we can give them a constant.
2. `initialAutoClickersValue` - an array of objects, one for each autoclicker tier. These objects will contain the `id`, the `cost`, and the `amount` associated with a given tier.

Now let's make these reactive.

As discussed above, we'll set up two signals, one to keep track of the current available "clicks", and another for the total.

For the autoclickers array we'll set up a store.

### Updating State
As a part of the game we'll need to be able to increment both the `clicks` and the `netWorth` on button click, so let's create an `updateClicker()` function which will do both.

Additionally we'll need to update both of these values every second with the sum of what all our autoclickers will produce. So let's create an `updateTotal()` function, which will first tally up all the newly created clicks by multiplying the amount of each autoclicker by 10% of its cost. (We can do this because in our game it just so happens that if an autoclicker costs 100 clicks then it produces 10 clicks per second.) Then we'll add this tally to both the `clicks` and the `netWorth`, because remember, they can hold different values.

Finally we need to handle the buying and selling of autoclickers. We'll do this via the `updateAutoClicker()` function. This function will have two parameters, a required one — `id`, and an optional one — `increment`. The former will be used to select the correct autoclicker, and the latter will default to `true` for buying, but will need to be set to `false` for selling.

### The Loop
While this was the hardest part of the React tutorial, here we run `setInterval` the same way we'd do it with regular JavaScript. It just works. Just so that this section can contain a loger paragraph, let's use `onCleanup` to delete the interval variable after we are done with our app.

### The Components
Now let's create the two components we are going to need.

`<Clicker />` will display the total number of currently available "clicks" and the button for manually incrementing this counter.

This one is fairly self explanatory. It takes two props:
  1. `amount` — we'll pass the `clicks` to it so that it shows the currently available clicks
  2. `update` — we'll pass `updateClicker()` to it so that it increments them when we click the button

`<AutoClicker />` will allow us to buy and sell autoclickers of a given tier.

This component will have the following logic:
  1. It will become visible once the amount of total clicks in the game equals to or surpases its cost.
  2. It will enable the buy button if the amount of available clicks equals to or surpases its cost.
  3. It will display the sell button if we have at least one autoclicket of this tier.

To achieve that it will will require the following props:
  1. `clicks` — we'll pass the `clicks` here
  2. `newWorth` — we'll pass the `netWorth` here
  3. `update` — we'll pass `updateAutoClicker()` here
  4. `id` — we'll pass the given tier's `id` property here
  5. `cost` — we'll pass the given tier's `cost` property here
  6. `amount` — we'll pass the given tier's `amount` property here

Now, using these props we can wire up the logic we discussed above and ... well, that's it. You've got a working game.


