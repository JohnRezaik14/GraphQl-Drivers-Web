import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DRIVERS } from "./graphql/queries";
import { useEffect, useState } from "react";
import { AddCarModal } from "./components/AddCarModal";
import { ADD_CAR } from "./graphql/mutations";

interface Driver {
  id: string;
  name: string;
  age: number;
  cars: Car[];
}
interface Car {
  name: string;
  model: string;
}

function App() {
  const { loading, error, data, refetch } = useQuery<{ drivers: Driver[] }>(
    GET_DRIVERS
  );
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    if (data && data.drivers) {
      setDrivers(data.drivers);
    }
  }, [data]);
  // console.log(drivers);

  const handleAddCar = async (name: string, model: string) => {
    console.log("handle", selectedDriverId);

    if (!selectedDriverId) return;
    console.log(selectedDriverId);

    await addCar({
      variables: { driverId: selectedDriverId, name, model },
    });

    setModalOpen(false);

    setSelectedDriverId(null);
    refetch();
  };

  return (
    <>
      <main className="h-screen w-full bg-gray-950 text-gray-50 flex flex-col justify-baseline items-center">
        {loading && <section>Loading Drivers.....</section>}
        {error && (
          <section>
            <p>Error fetching drivers: {error?.message}</p>
          </section>
        )}
        {drivers && (
          <section className="bg-gray-700 p-4 w-3xl h-screen flex flex-col gap-4">
            {drivers.map((driver) => {
              return (
                <div className="bg-gray-900 rounded-lg p-4" key={driver.id}>
                  <div className="flex">
                    <p className="flex-1">
                      Name: <span className="text-cyan-500">{driver.name}</span>
                    </p>
                    <button
                      className="bg-teal-800 text-gray-50 rounded p-2 cursor-pointer transition-colors duration-300 hover:bg-teal-200 hover:text-gray-700"
                      onClick={() => {
                        setSelectedDriverId(driver.id);
                        setModalOpen(true);
                      }}
                    >
                      Add New Car
                    </button>
                  </div>

                  <p>
                    Age: <span className="text-cyan-500">{driver.age}</span>
                  </p>
                  <div className="mt-5 pl-5 bg-gray-600 rounded-md p-2">
                    <h6>Cars:</h6>
                    <div className="flex gap-2">
                      {driver.cars.map((car, idx) => {
                        return (
                          <div className="p-2 bg-gray-800" key={idx}>
                            {car.name} {car.model}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}
        <AddCarModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddCar}
        />
      </main>
    </>
  );
}

export default App;
