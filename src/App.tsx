import type { Component } from 'solid-js';
import { createSignal, For, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

import Clicker from './Clicker';
import AutoClicker, { IAutoClicker } from './AutoClicker';

const initialClicksValue = 0;
const initialAutoClickersValue: IAutoClicker[] = [
  { id: 'auto', cost: 10, amount: 0 },
  { id: 'double', cost: 20, amount: 0 },
  { id: 'multi', cost: 100, amount: 0 },
  { id: 'mega', cost: 1000, amount: 0 },
  { id: 'ultra', cost: 10000, amount: 0 },
  { id: 'monster', cost: 100000, amount: 0 },
];

const App: Component = () => {
  const [clicks, setClicks] = createSignal<number>(initialClicksValue);
  const [netWorth, setNetWorth] = createSignal<number>(initialClicksValue);
  const [autoClickers, setAutoClickers] = createStore<IAutoClicker[]>(initialAutoClickersValue);

  const updateClicker = (): void => {
    setClicks(clicks() + 1);
    setNetWorth(netWorth() + 1);
  };

  const updateAutoClicker = (id: string, increment = true): void => {
    const direction = increment ? 1 : -1;
    const currentAutoClicker: IAutoClicker | undefined = autoClickers.find(autoClicker => autoClicker.id === id);
    currentAutoClicker && setClicks(clicks() - currentAutoClicker.cost * direction);
    setAutoClickers(autoClicker => autoClicker.id === id, 'amount', amount => amount + 1 * direction);
  };

  const updateTotal = (): void => {
    const newTotal: number = autoClickers.reduce((acc, cur) => acc + cur.amount * (cur.cost * 0.1), 0);
    setClicks(newTotal + clicks());
    setNetWorth(newTotal + netWorth());
  };

  const interval: number = setInterval(updateTotal, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <div class="game">
      <div class="banner">
        This is an accompanying example to a clicker game tutorial using Solid. See
        <a href="https://github.com/Alaricus/clicker-tutorial-solid">GitHub</a>
        for more details.
      </div>
      <Clicker amount={clicks()} update={updateClicker} />
      <For each={autoClickers}>
        {
          autoClicker => (
            <AutoClicker
              {...autoClicker}
              update={updateAutoClicker}
              clicks={clicks()}
              netWorth={netWorth()}
            />
          )
        }
      </For>
    </div>
  );
};

export default App;
