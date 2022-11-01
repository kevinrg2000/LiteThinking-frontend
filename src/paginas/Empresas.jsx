import FormularioEmpresa from "../components/FormularioEmpresa"

const Empresas = () => {
    return (
      <>
          <h1 className="text-4xl font-black">Crear empresa</h1>
  
            <div className="mt-10 flex justify-start">
                <FormularioEmpresa/>
                <div className=" justify-center">
                </div>
                <div className=" justify-end">
                </div>
          </div>
      </>
    )
  }
  
  export default Empresas