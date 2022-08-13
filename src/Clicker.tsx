interface IClickerProps {
  amount: number;
  update: () => void;
}

const Clicker = (props: IClickerProps) => (
  <div class="clicker">
    <h1>{Intl.NumberFormat().format(props.amount)}</h1>
    <button
      class="buy"
      type="button"
      onClick={() => props.update()}
    >
      click button
    </button>
  </div>
);

export default Clicker;
