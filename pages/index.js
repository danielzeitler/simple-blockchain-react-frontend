export default function Home() {

  const buyStar = () => {
    console.log("%cbuy my star", "color: red; background: black; font-size: 30px");
  }

  return (
    <div>
      <h1 className="text-center mt-20 text-3xl font-bold">
        Kauf dein Stern &#127775; &#127775; &#127775;
      </h1>
      <div className="max-w-5xl mx-auto mt-20 px-5">
        <input className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="stern" type="text" placeholder="Dein Stern" />
        <button onClick={() => buyStar()} className="bg-blue-500 mx-auto justify-center flex mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          To The Moon &#128640; &#128640; &#128640;
        </button>
      </div>
    </div>
  )
}
