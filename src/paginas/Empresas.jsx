import FormularioEmpresa from "../components/FormularioEmpresa"
import PreviewEmpresa from "../components/PreviewEmpresas"
import useEmpresas from "../hooks/useEmpresas"
const Empresas = () => {
   const { empresas, alerta } = useEmpresas()
    return (
      <>
          <h1 className="text-4xl font-black">Crear empresa</h1>
  
            <div className="mt-10 flex justify-start">
            <FormularioEmpresa/>
              <div className=" justify-center ">
                <div className="bg-white shadow mt-10 rounded-lg m-4">
                  {empresas.length ? 
                    empresas.map(empresa => (
                    <PreviewEmpresa 
                    key={empresa._id}
                    empresa={empresa}
                    />
                    ))
                    : <p className=" text-center text-gray-600 uppercase  p-5">No hay proyectos aún</p>}
        
                </div>
              </div>
                <div className=" justify-end">
                </div>
          </div>
      </>
    )
  }
  
  export default Empresas