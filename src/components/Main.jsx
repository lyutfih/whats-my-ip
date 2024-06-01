import { useState, useEffect } from "react";
import Map from "./Map";
import axios from "axios";
import Loader from "./Loader";
import { DateTime } from "luxon";

const Main = () => {
  const url = "https://geo.ipify.org/api/v2/country,city";
  const countryUrl = "https://countryapi.io/api/all";
  const [ipData, setIpData] = useState(
    JSON.parse(localStorage.getItem("ipData")) || {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);

  useEffect(() => {
    if (
      Object.keys(ipData).length <= 0 ||
      Date.now() - ipData.lastUpdatedTime > 0.5 * 60 * 1000
    ) {
      getIP();
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ipData", JSON.stringify(ipData));
  }, [ipData]);

  const getIP = async () => {
    setIsLoading(true);
    setIsLoadingCountry(true);
    try {
      axios
        .get(url, {
          params: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        })
        .then((response) => {
          const respWithDate = {
            ...response.data,
            lastUpdatedTime: Date.now(),
          };
          axios
            .get(countryUrl, {
              params: {
                apikey: import.meta.env.VITE_COUNTRY_API_KEY,
              },
            })
            .then((response) => {
              const checkCountry = respWithDate.location.country.toLowerCase();
              const allData = {
                ...respWithDate,
                countryData: response.data[checkCountry],
              };
              setIpData(allData);
            });
        });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsLoadingCountry(false);
    }
  };

  return isLoading || isLoadingCountry || Object.keys(ipData).length === 0 ? (
    <Loader />
  ) : (
    <>
      <article className="rounded-xl border absolute z-10 border-gray-700 bg-gray-800 p-4 m-[1.5vh] shadow-xl max-sm:relative overflow-scroll max-h-[97vh] no-scrollbar">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={`https://flagcdn.com/w550/${ipData.location.country.toLowerCase()}.png`}
            className="size-16 rounded-lg object-cover"
          />

          <div>
            <h4 className="text-gray-400 font-medium text-sm">
              Your IP Address:
            </h4>
            <h3 className="text-xl font-medium text-white">{ipData.ip}</h3>
            <p className="text-xs font-medium text-gray-400">
              {ipData.location.city} / {ipData.location.region}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-gray-800 px-6">IP Details</span>
          </span>
          <li>
            <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
              <p className="font-medium text-white mb-2">
                Internet Service Provider
              </p>

              <b className="font-medium text-xs text-gray-400">Name</b>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {ipData.isp}
              </p>

              <strong className="font-medium text-xs text-gray-400">
                Domain
              </strong>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {ipData.as.domain}
              </p>
              <strong className="font-medium text-xs text-gray-400">
                Route
              </strong>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {ipData.as.route}
              </p>
            </span>
          </li>

          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-gray-800 px-6">
              Country Details
            </span>
          </span>

          <li>
            <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
              <p className="font-medium text-white mb-2">
                {ipData?.countryData.name}
              </p>

              <strong className="font-medium text-xs text-gray-400">
                Population
              </strong>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {ipData?.countryData.population
                  .toLocaleString()
                  .replaceAll(".", ",")}
              </p>

              <strong className="font-medium text-xs text-gray-400">
                Language
              </strong>
              {Object.values(ipData?.countryData.languages).map((key) => (
                <p key={key} className="mt-1 text-xs font-medium text-gray-300">
                  {key}
                </p>
              ))}

              <strong className="font-medium text-xs text-gray-400">
                Capital
              </strong>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {ipData?.countryData.capital}
              </p>

              <strong className="font-medium text-xs text-gray-400">
                Date
              </strong>
              <p className="mt-1 text-xs font-medium text-gray-300">
                {DateTime.local()
                  .setZone(ipData?.location?.timezone)
                  .toLocaleString(DateTime.DATETIME_SHORT, {
                    locale: ipData.location.country.toLowerCase(),
                  })}
              </p>
            </span>
          </li>
        </ul>
      </article>

      <div className="h-full w-full absolute max-sm:block max-sm:p-[1.5vh] max-sm:mb-3 max-sm:max-h-80">
        <Map
          lat={ipData?.location?.lat}
          lng={ipData?.location?.lng}
          country={ipData?.countryData?.name}
          city={ipData?.location?.city}
          region={ipData?.location?.region}
        />
      </div>
    </>
  );
};

export default Main;
