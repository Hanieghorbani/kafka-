import React, { useEffect, useState, useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"
import Input from "../../../components/Fields/Input/Input"
import TextArea from "../../../components/Fields/TextArea/TextArea"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"


export default function Contacts() {
  const navigate = useNavigate()
  const { config } = useContext(ContextData)
  const [captcha, setCaptcha] = useState("")
  const [answer, setAnswer] = useState("")
  
  useEffect(()=>window.scrollTo(0, 0),[])
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    body: "",
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("نام الزامی است")
      .min(7, "نام باید حداقل ۳ حرف داشته باشد"),
    email: Yup.string()
      .email("فرمت ایمیل وارد شده نا معتبراست")
      .required("ایمیل الزامی است"),
    phone: Yup.string().required("تلفن الزامی است"),
    body: Yup.string()
      .required("متن پیام الزامی است")
      .min(20, "پیام وارد شده نمی تواند کمتر از 20 حرف باشد"),
    captcha: Yup.number("نتیجه را به عدد وارد کنید")
      .required("نتیجه محاسبه الزامی است")
      .test("captcha", "نتیجه محاسبه صحیح نیست", (value) => {
        return value && value == answer
      }),
  })

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10)
    const operator = ["+", "-", "*"][Math.floor(Math.random() * 3)]
    const num2 = Math.floor(Math.random() * 10)

    const getResult = (num1, operator, num2) => {
      switch (operator) {
        case "+":
          return num1 + num2
        case "-":
          return num1 - num2
        case "*":
          return num1 * num2
      }
    }

    setCaptcha(`${num1} ${operator} ${num2}`)
    setAnswer(getResult(num1, operator, num2))
  }, [])

  function sendMsgHandler(values) {
    delete values.captcha
    axios
      .post("https://lafka-back.liara.run/v1/contact", values, config)
      .then((res) => {
        swal({
          title: "پیام شما ارسال شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          navigate("/")
        })
      })
  }
  return (
    <div>
      <TopSection subTitle={"تماس با ما"} bg={"bg-img-contact"} bgHead={"bg-inherit"}/>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 my-20 container-primary gap-16">
        <div className="md:col-span-1 space-y-5">
          <h1 className="text-2xl">درباره لافکا</h1>
          <p className="text-zinc-400">
            برای کسب اطلاعات بیشتر در مورد تجربه خرید یا تبلیغات فعلی خود:
          </p>
          <p className="font-[faNum] text-zinc-500 text-xl leading-9">
            آدرس: تهران – خ ولیعصر –<br /> مجتمع اداری ولیعصر
            <br /> 09127095853
          </p>
        </div>
        <div className="md:col-span-2">
          <h1 className="sm:text-lg md:text-2xl mb-5">
            چیزی در ذهن شماست؟ ما از بازخورد شما قدردانی می کنیم فرم زیر را پر
            کنید و به زودی به شما جواب خواهیم داد.
          </h1>
          <div className="border rounded-2xl p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={sendMsgHandler}
            >
              <Form className="space-y-10">
                <Input label={"نام شما:"} id={"name"} />
                <Input label={"آدرس ایمیل:"} id={"email"} />
                <Input label={"تلفن:"} id={"phone"} />
                <TextArea
                  label={"متن پیام:"}
                  id={"body"}
                  style={"form-contact h-40"}
                />

                <div className="grid sm:grid-cols-1 md:grid-cols-3">
                  <p className="w-full text-zinc-400 md:col-span-2">
                    ثابت کنید که شما یک انسان هستید:{" "}
                  </p>
                  <div className="flex items-center justify-end md:col-span-1">
                    <Field
                      dir="ltr"
                      as="input"
                      type="text"
                      id="captcha"
                      name="captcha"
                      className="border-0 bg-zinc-100  focus:bg-zinc-200 rounded-xl w-1/4"
                    />
                    <span className="flex font-[faNum]" dir="ltr">
                      {captcha} =
                    </span>
                  </div>

                  <ErrorMessage
                    name="captcha"
                    component="div"
                    className="error form-error  md:w-1/2"
                  />
                </div>
                <button type="submit" className="btn-yearStorySelect text-sm">
                  ارسال پیام
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
