import { useState, useEffect } from "react";
import { fetchIp } from "../services/fetchIp";
import Map from "./Map";
import { fetchCountry } from "../services/fetchCountry";

const Header = () => {
  const url = "https://geo.ipify.org/api/v2/country,city";
  const [ipData, setIpData] = useState(
    JSON.parse(localStorage.getItem("ipData")) || {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    if (
      Object.keys(ipData).length <= 0 ||
      Date.now() - ipData.lastUpdatedTime > 15 * 60 * 1000
    ) {
      setIsLoading(true);
      getIP();
      return;
    }
    getCountry();
  }, []);

  useEffect(() => {
    localStorage.setItem("ipData", JSON.stringify(ipData));
  }, [ipData]);

  const getIP = async () => {
    setIsLoading(true);
    const resp = await fetchIp();
    const respWithDate = {
      ...resp.responseIpData,
      lastUpdatedTime: Date.now(),
    };
    setIpData(respWithDate);
    setIsLoading(false);
  };

  const getCountry = async () => {
    setIsLoadingCountry(true);
    const resp = await fetchCountry(ipData.location.country);
    setCountryData(resp.responseCountryData);
    setIsLoadingCountry(false);
  };

  return isLoading && setIsLoadingCountry ? (
    <h3>Loading your IP address</h3>
  ) : (
    Object.keys(ipData).length > 0 && countryData.length > 0 && (
      <>
        {console.log(countryData)}
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
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>

            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
            <li>
              <span className="block h-full rounded-lg border border-gray-700 p-4 hover:border-blue-600">
                <strong className="font-medium text-white">Project B</strong>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {countryData[0].name.common}
                </p>
              </span>
            </li>
          </ul>
        </article>

        <div className="h-full w-full absolute max-sm:block max-sm:p-[1.5vh] max-sm:mb-3 max-sm:max-h-80">
          <Map
            lat={ipData?.location?.lat}
            lng={ipData?.location?.lng}
            country={countryData[0].name.common}
            city={ipData?.location?.city}
            region={ipData?.location?.region}
          />
        </div>
      </>
    )
  );
};

export default Header;
