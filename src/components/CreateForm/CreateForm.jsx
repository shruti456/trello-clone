import { forwardRef } from "react";
import styles from "./CreateForm.module.css";

const CreateForm = forwardRef(function CreateForm(
  { children, title, onSubmit, onCancel },
  ref,
) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <h2>{title}</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          {children}

          <div className={styles.actionButtons}>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CreateForm;
