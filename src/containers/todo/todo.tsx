import { FC, useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  deleteList,
  getList,
  postList,
  uploadFile,
} from "./_repositories/repositores";
import Modal from "../../components/modal";

interface Plant {
  _id: string;
  name: string;
  description: string;
  image: string;
  updatedAt: string;
}

interface ListResponse {
  data: Plant[];
  page: number;
  count: number;
  perPage: number;
}

const Todo: FC = () => {
  const [listTanaman, setListTanaman] = useState<ListResponse>({
    data: [],
    page: 0,
    count: 0,
    perPage: 100,
  });
  const [loading, setLoading] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    description: "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: null as any,
  });

  const fetchTanaman = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const res = await getList({ params: {} });
        setListTanaman(res);
      } catch (error) {
        setListTanaman({
          data: [],
          page: 0,
          count: 0,
          perPage: 100,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTanaman = async (id: string) => {
    try {
      await deleteList({ data: [id] });
      fetchTanaman();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTanaman();
    return () => {
      setListTanaman({ data: [], page: 0, count: 0, perPage: 100 });
      setLoading(false);
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewPlant((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("dirString", "ND5Osojl0mAe");

        const res = await uploadFile({ data: formData });

        setNewPlant((prev) => ({ ...prev, image: res }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPlant.name && newPlant.description && newPlant.image) {
      try {
        await postList({
          data: [
            {
              ...newPlant,
              image: newPlant.image?.Location,
            },
          ],
        });

        setOpenModalCreate(false);
        fetchTanaman();
        setNewPlant({
          name: "",
          description: "",
          image: null,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderData = () => {
    if (loading) {
      return (
        <>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              className="rounded-2xl bg-slate-200 flex shadow-lg h-56 animate-pulse"
              key={index}
            >
              <div className=" bg-slate-100 rounded-l-2xl object-cover w-2/5" />
              <div className="flex flex-col p-4 w-3/5 justify-between">
                <div className="flex flex-col w-full gap-2">
                  <div className="h-4 bg-slate-300 rounded-full w-10/12"></div>
                  <div className="h-2 bg-slate-300 rounded-full w-8/12 mt-2"></div>
                  <div className="h-2 bg-slate-300 rounded-full w-6/12"></div>
                  <div className="h-2 bg-slate-300 rounded-full w-8/12"></div>
                  <div className="h-2 bg-slate-300 rounded-full w-5/12"></div>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    } else if (listTanaman?.data?.length > 0) {
      return listTanaman?.data?.map((item, index) => (
        <div
          className="rounded-2xl bg-[#1c4454] flex shadow-lg h-56"
          key={index}
        >
          <img
            className=" bg-slate-100 rounded-l-2xl object-cover w-2/5"
            alt="image-plant"
            src={item?.image}
          />
          <div className="flex flex-col p-4 w-3/5 justify-between">
            <div className="flex flex-col w-full gap-2">
              <p className="text-white text-2xl font-semibold">{item?.name}</p>
              <p className="text-slate-100 text-sm">{item?.description}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-slate-300 text-xs italic">{item?.updatedAt}</p>
              <div className="flex items-center justify-center">
                <button className="flex items-center justify-center p-2 rounded-full h-10 w-10 hover:bg-slate-500 text-slate-50 cursor-pointer transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <rect width="256" height="256" fill="none" />
                    <path d="M224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Zm5.66-58.34-96,96A8,8,0,0,1,128,168H96a8,8,0,0,1-8-8V128a8,8,0,0,1,2.34-5.66l96-96a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,229.66,69.66Zm-17-5.66L192,43.31,179.31,56,200,76.69Z" />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center p-2 rounded-full h-10 w-10 hover:bg-slate-500 text-slate-50 cursor-pointer transition-colors"
                  onClick={() => deleteTanaman(item?._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <rect width="256" height="256" fill="none" />
                    <path d="M224,56a8,8,0,0,1-8,8h-8V208a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,56ZM88,32h80a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full p-6 items-center bg-white rounded-xl">
      <div className="flex flex-col gap-4 justify-center items-center text-center w-full lg:w-9/12">
        <h1 className="text-4xl font-semibold">Sirami Tanamanmu Hari ini!</h1>
        <p className="text-slate-500">
          Beli tanaman jangan lupa dirawat bolo🫵🏼🫵🏼🫵🏼... beli mahal-mahal
          tapi didiemin, mending kasih ke sini aja..
        </p>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setOpenModalCreate(true)}
            className="items-center justify-center flex bg-[#1c4454] text-white px-4 py-2 rounded-full text-sm hover:bg-[#708b94] cursor-pointer transition-colors"
          >
            ADD PLANT
          </button>
          <button className="items-center justify-center flex border-2 border-[#1c4454] text-[#1c4454] px-4 py-2 rounded-full text-sm hover:border-[#708b94] hover:bg-[#708b94] hover:text-white cursor-pointer transition-colors">
            SEE MORE
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 w-full lg:w-9/12 md:grid-cols-2 lg:grid-cols-3">
        {renderData()}
      </div>
      <Modal
        openModal={openModalCreate}
        closeModal={() => setOpenModalCreate(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex justify-center items-center">
              <p className="text-xl font-semibold">Tambahkan Tanamanmu 🫵🏼</p>
            </div>
            <div className="gap-4 w-full grid">
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Nama<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={newPlant.name}
                  onChange={handleInputChange}
                  className="text-sm rounded-lg block w-full p-2.5 border"
                  placeholder="Masukkan Nama Tanamanmu"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Deskripsi<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={newPlant.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="text-sm rounded-lg block w-full p-2.5 border"
                  placeholder="Deskripsikan Tanamanmu"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Foto<span className="text-red-500">*</span>
                </label>
                {newPlant?.image?.Location ? (
                  <img
                    className=" bg-slate-100 rounded-lg object-cover w-40 h-auto"
                    alt="image-plant"
                    src={newPlant?.image?.Location}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG or JPG
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                type="submit"
                className="items-center justify-center flex bg-[#1c4454] text-white px-4 py-2 rounded-full text-sm hover:bg-[#708b94] cursor-pointer transition-colors"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={() => setOpenModalCreate(false)}
                className="items-center justify-center flex border-2 border-[#1c4454] text-[#1c4454] px-4 py-2 rounded-full text-sm hover:border-[#708b94] hover:bg-[#708b94] hover:text-white cursor-pointer transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Todo;
