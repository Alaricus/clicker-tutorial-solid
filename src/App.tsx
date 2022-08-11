import type { Component } from 'solid-js';
import { createSignal, For, onCleanup } from 'solid-js';
import { createStore } from "solid-js/store";

import { Clicker, IClicker } from './Clicker';
import { AutoClicker, IAutoClicker } from './AutoClicker';

const initialClickerValue = { amount: 0 };
const initialAutoClickersValue = [
  { id: "auto", cost: 10, amount: 0 },
  { id: "double", cost: 20, amount: 0 },
  { id: "multi", cost: 100, amount: 0 },
  { id: "mega", cost: 1000, amount: 0 },
  { id: "ultra", cost: 10000, amount: 0 },
  { id: "monster", cost: 100000, amount: 0 },
]

const App: Component = () => {
  const [clicker, setClicker] = createSignal<IClicker>(initialClickerValue);
  const [netWorth, setNetWorth] = createSignal<IClicker>(initialClickerValue);
  const [autoClickers, setAutoClickers] = createStore<IAutoClicker[]>(initialAutoClickersValue);

  const updateClicker = () => {
    setClicker({ amount: clicker().amount + 1 });
    setNetWorth({ amount: netWorth().amount + 1 });
  };

  const updateAutoClicker = (id: string, increment: boolean = true) => {
    const direction = increment ? 1 : -1;
    const autoClicker = autoClickers.find(autoClicker => autoClicker.id === id);
    autoClicker && setClicker({ amount: clicker().amount - autoClicker.cost * direction});
    setAutoClickers(autoClicker => autoClicker.id === id, "amount", amount => amount + 1 * direction);
  };

  const updateTotal = () => {
    const newTotal = autoClickers.reduce((acc, cur) => acc + cur.amount * (cur.cost * 0.1), 0);
    setClicker({ amount: newTotal + clicker().amount });
    setNetWorth({ amount: newTotal + netWorth().amount });
  };

  const interval = setInterval(updateTotal, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <div class="game">
      <div class="banner">
        This is an accompanying example to a clicker game tutorial using Solid. See
        <a href="https://github.com/Alaricus/clicker-tutorial-solid">GitHub</a>
        for more details.
      </div>
      <Clicker {...clicker()} update={updateClicker} />
      <For each={autoClickers}>
        {
          autoClicker => (
            <AutoClicker
              {...autoClicker}
              update={updateAutoClicker}
              clicks={clicker().amount}
              netWorth={netWorth().amount}
            />
          )
        }
      </For>
    </div>
  );
};

export default App;
