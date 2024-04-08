import { Loader } from '@progress/kendo-react-indicators';

const SavingOverlayer = () => {
  return (
    <div
      className="absolute w-full h-full left-0 top-0 bg-black bg-opacity-10 z-50 text-center flex items-center justify-center pb-10"
      id="saving-overlayer"
    >
      <Loader type="pulsing" size="large" />
    </div>
  );
};

export default SavingOverlayer;
