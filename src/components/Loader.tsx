import { Loader } from '@progress/kendo-react-indicators';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader type="converging-spinner" size="large" />
    </div>
  );
};

export default Loading;
