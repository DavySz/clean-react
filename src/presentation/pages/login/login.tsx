import React, { useState } from "react";
import Styles from "./login-styles.scss";
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({ isLoading: false, errorMessage: "" });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button type="submit" disabled className={Styles.submit}>
            Entrar
          </button>
          <span className={Styles.link} data-testid="submit">
            Criar conta
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
