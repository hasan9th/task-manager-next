'use client'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginData, loginSchema } from "../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@base-ui/react";
import { login } from "../services/authService";
async function onSubmit(data:LoginData){
const result = await login(data)
console.log(result)
}
export function FieldInput() {
    const {register, handleSubmit,formState:{errors}}=useForm<LoginData>({resolver:zodResolver(loginSchema)});

  return (
    <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit(data=>onSubmit(data))} >
        <FieldSet className="">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" {...register("email",{required:true})} type="text" placeholder="example@sdfsd.sd" />
              {errors.email&&<p className="text-red-500 text-sm">{errors.email.message}</p>}
              <FieldDescription>
                Choose a unique email for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 3 characters long.
              </FieldDescription>
              <Input id="password" {...register("password",{required:true})} type="password" placeholder="••••••••" />
              {errors.password&&<p className="text-red-500 text-sm">{errors.password.message}</p>}
            </Field>
            <Field>
                <Button type="submit">
                    Login
                </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
        </form>
    </div>
  )
}

export default function Login(){
    return(
        <div className="w-full flex flex-col items-center">
        
        <h1>Login page</h1>
        <FieldInput/>
      </div>
    )
}


