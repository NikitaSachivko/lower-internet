interface TitleProps {
  title: string;
  subtitle?: string
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h3 className="text-4xl font-semibold text-white">{title}</h3>
      {subtitle && <h4 className="text-2xl text-gray-500">{subtitle}</h4>}
    </div>
  );
};

export default Title;
