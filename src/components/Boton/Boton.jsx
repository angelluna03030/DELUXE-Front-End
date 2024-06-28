export const Boton =({titulo})=>{
    return <>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button onClick={()=>alert("hol mundo")}>
{titulo}
    </button>
    </>
}