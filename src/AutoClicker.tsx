import { Show } from 'solid-js';

export interface IAutoClicker {
  id: string;
  cost: number;
  amount: number;
}

interface IAutoClickerProps extends IAutoClicker {
  clicks: number;
  netWorth: number;
  update: (id: string, action?: boolean) => void;
}

export const AutoClicker = (props: IAutoClickerProps) => (
  <Show
    when={props.netWorth >= props.cost}
    fallback={null}
  >
    <div class="clicker">
      <div class="info">
        <h2>{`${Intl.NumberFormat().format(props.amount)} × ${props.id}clicker`}</h2>
        <p>{`this ${props.id}clicker buys and sells for ${Intl.NumberFormat().format(props.cost)}`}</p>
      </div>
      <button
        class={`buy ${props.clicks >= props.cost ? undefined : 'disabled'}`}
        type="button"
        onClick={() => props.update(props.id)}
      >
        {`buy ${props.id}clicker`}
      </button>
      {
        props.amount > 0 && <button
          class="sell"
          type="button"
          onClick={() => props.update(props.id, false)}
        >
          -
        </button>
      }
    </div>
  </Show>
);
