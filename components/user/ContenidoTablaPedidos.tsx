import React from "react";

interface Props {
  id: number | string;
  fecha: string;
  estado: string;
  valor: number;
  //descripcion prop is children react
  children: React.ReactNode;
}

/*
Este comnponente es el contenido de la tabla de pedidos.
Este componente debe ir dentro de una etiqueta tbody que este dentro de una etiqueta
table con la clase "table table-bordered" de bootstrap.
  ej:
  <table className="table table-bordered">
    <tbody>
      <ContenidoTablaPedidos ...propiedades... />
        descripcion
      </ContenidoTablaPedidos>

      <ContenidoTablaPedidos ...propiedades... />
        descripcion
      </ContenidoTablaPedidos>

      <ContenidoTablaPedidos ...propiedades... />
        descripcion
      </ContenidoTablaPedidos>
    </tbody>
  </table>

  recibe:
    id: que es el id del pedido
    fecha: que es la fecha del pedido
    estado: que es el estado del pedido
    valor: que es el valor del pedido
    children: que es la descripcion del pedido    
*/

const ContenidoTablaPedidos = ({
  id,
  fecha,
  estado,
  valor,
  children,
}: Props) => {
  const formatNumberToprice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const valorConFormato = valor ? formatNumberToprice(valor) : "N/A";

  return (
    <>
      <tr className="contenidoTablaPedidos__salto" />
      <tr className="contenidoTablaPedidos__thead">
        <td colSpan={4} className="contenidoTablaPedidos__titulo1">
          Pedido N°: {id ? id : "N/A"}
        </td>
      </tr>
      <tr className="contenidoTablaPedidos__head">
        <td>Fecha</td>
        <td>Estado</td>
        <td>Valor</td>
      </tr>
      <tr className="contenidoTablaPedidos__body">
        <td>{fecha ? fecha : "N/A"}</td>
        <td>{estado ? estado : "N/A"}</td>
        <td>{valorConFormato}</td>
      </tr>
      <tr>
        <td colSpan={4} className="contenidoTablaPedidos__titulo2">
          Descripción
        </td>
      </tr>
      <tr>
        <td colSpan={4} className="contenidoTablaPedidos__descripcion">
          {children ? children : "N/A"}
        </td>
      </tr>
    </>
  );
};

export default ContenidoTablaPedidos;
