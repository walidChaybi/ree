import { ErrorMessage, useField } from "formik";
import "./ChampsZoneTexte.scss";

type TChampsZoneTexteProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value?: string };

const ChampsZoneTexte: React.FC<TChampsZoneTexteProps> = ({
  name,
  className,
  ...props
}) => {
  const [field, meta] = useField(name as string);

  return (
    <>
      <textarea
        className={`zone-texte-rece ${className}`.trim()}
        {...props}
        {...field}
      />
      {meta.error && (
        <div className="message-erreur-textearea">
          <ErrorMessage name={name} />
        </div>
      )}
    </>
  );
};

export default ChampsZoneTexte;
