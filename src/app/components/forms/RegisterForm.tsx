'use client'
import { register } from '@/logActions'
import { useFormState } from "react-dom"

export default function RegisterForm(){

  const [state,formAction] = useFormState<any,FormData>(register,undefined)

  return(
    <form action={formAction}>
      <div>Username:</div><input type="text" name="username" required />
      <div>Password:</div><input type='password' name='password' required />
      <div>Employee Number: </div><input type='text' name="employeeNumber" required />
      <div>Last Name</div><input type="text" name="lastName" required />
      <div>Given Name</div><input type='text' name='firstName' required/>
      <div>Email: </div><input type="email" name='email' required />
      <div>Team: </div><select name='team' required>
        <option value="ASSY">ASSY</option>
        <option value="GAQ">GAQ</option>
        <option value="ADLK FAB">ADLK FAB</option>
        <option value="ADWIL FAB">ADWIL FAB</option>
        <option value="CBU">CBU</option>
        <option value="EXT FAB">EXT FAB</option>
        <option value="ADLK FAB">PDC</option>
      </select>
      <div>Nickname:</div><input type='text' name='nickname' required />
      <br></br>
      <button type="submit">Register</button>
       {state?.error && <p>{state.error}</p>} 
    </form>
  )

}