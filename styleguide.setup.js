import { Field, Form, Formik } from "formik";
import { BrowserRouter } from "react-router-dom";

import { COLORS } from "./src/vars";
import "./src/i18n";

global.COLORS = COLORS;
global.BrowserRouter = BrowserRouter;
global.Formik = Formik;
global.FormikForm = Form;
global.FormikField = Field;
