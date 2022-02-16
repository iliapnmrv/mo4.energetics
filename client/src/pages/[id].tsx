import React from "react";
import $api from "http/index";
import { IItem } from "pages";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-mui";

export async function getStaticPaths() {
  const { data } = await $api.get<IItem[]>(`item`);
  const paths = data.map((item) => ({
    params: { id: item.inventorynumber.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { data } = await $api.get(`item/${params.id}`);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

type Props = {
  data: IItem;
};

export default function Qr({ data }: Props) {
  const { inventorynumber, history, supplier, name, person, status } = data;
  return (
    <Formik
      initialValues={{
        inventorynumber,
        history,
        supplier,
        name,
        person,
        status,
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <Field
            label="Инвентарный номер"
            type="text"
            name="inventorynumber"
            placeholder="Инвентарный номер"
            component={TextField}
          />
          <Field
            label="Поставщик"
            type="text"
            name="supplier"
            placeholder="Поставщик"
            component={TextField}
          />
          <Field
            label="Наименование"
            type="text"
            name="name"
            placeholder="Наименование"
            component={TextField}
          />
          <Field as="select" name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <Field name="lastName" placeholder="Doe" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
