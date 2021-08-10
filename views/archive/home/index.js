import Button from "components/button";
import { useWalletModalToggle } from "components/modals/WalletModal/state";
import { Fragment } from "react";
import Snippet from "./snippet";

export default function HomeView() {
  const toggleWalletModal = useWalletModalToggle();

  return (
    <Fragment>
      <section className="py-12 md:pb-16 relative overflow-hidden">
        <div className="container-sm z-10">
          <div className="md:flex md:-mx-6">
            <div className="w-full md:w-1/2 md:p-8">
              <div className="w-full">
                <h1 className="text-3xl md:text-4xl md:mt-20 mb-6 md:mb-8">
                  Credit backed by trust
                </h1>
                <p className="text-lg md:text-xl leading-tight font-normal mb-6 md:mb-8 max-w-md">
                  Union works without the need for collateral, credit score, or
                  revealing personal information on a public ledger.
                </p>

                <Button
                  onClick={toggleWalletModal}
                  className="btn-full-mobile"
                  wide
                >
                  Get started
                </Button>

                <div className="mt-12">
                  <img
                    src="/images/credit-backed-by-trust.svg"
                    alt="Credit backed by trust"
                    className="relative"
                    loading="eager"
                    importance="high"
                    style={{ zIndex: -2 }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:p-8">
              <div className="sm:ml-8 pt-20 md:pt-0 md:ml-0 -mr-8">
                <img
                  className="app shadow-app"
                  src="/images/app.svg"
                  alt=""
                  loading="eager"
                  importance="high"
                />
              </div>

              <div className="sm:ml-8 md:ml-16 mt-8 md:mt-16">
                <p className="text-type-light mb-6">
                  Trusted by industry leading investors
                </p>
                <div className="flex flex-wrap items-center -mb-4 -mr-8 md:-mr-16">
                  <div className="pb-4 pr-8 md:pr-16">
                    <img
                      src="/images/1kx.svg"
                      loading="eager"
                      importance="high"
                      alt="1kx"
                    />
                  </div>
                  <div className="pb-4 pr-8 md:pr-16">
                    <img
                      src="/images/kr1.svg"
                      loading="eager"
                      importance="high"
                      alt="KR1"
                    />
                  </div>
                  <div className="pb-4 pr-8 md:pr-16">
                    <img
                      src="/images/coinfund.svg"
                      loading="eager"
                      importance="high"
                      alt="CoinFund"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="skew" />
      </section>

      <section className="py-12 md:py-20 lg:pt-24 lg:pb-32">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row-reverse md:-mx-6">
            <div className="w-full md:w-1/2 md:p-8 flex md:justify-end">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl mb-8 md:my-10">
                  Become your own bank
                </h2>

                <div className="flex justify-center md:hidden pb-8">
                  <div className="-mb-10">
                    <img
                      src="/images/become-your-own-bank.png"
                      width={464}
                      height={464}
                      alt="Become your own bank"
                    />
                  </div>
                </div>

                <ol className="md:max-w-md">
                  <li className="pb-4 md:pb-6">
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
                        1
                      </div>
                      <div className="flex-1">
                        Easily manage who you trust and how much you trust them
                        with.
                      </div>
                    </div>
                  </li>
                  <li className="pb-4 md:pb-6">
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
                        2
                      </div>
                      <div className="flex-1">
                        See how much they’ve used from your pool
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
                        3
                      </div>
                      <div className="flex-1">
                        See when their due date is and adjust their trust as you
                        go along
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:p-8 hidden md:block">
              <div className="-ml-7 -mb-10">
                <img
                  src="/images/become-your-own-bank.png"
                  width={464}
                  height={464}
                  alt="Become your own bank"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-border-light pt-8 pb-10 sm:pt-12 sm:pb-16 md:pt-24 md:pb-32">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row md:items-center md:-mx-6">
            <div className="w-full md:w-1/2 md:p-8 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl mb-6 md:mb-8">
                Your circle of trust
              </h2>
              <p className="md:text-xl leading-tight font-normal max-w-md">
                Union is all about trust. Create your own circle of trust where
                you, your friends and family can borrow funds whenever needed.
              </p>
            </div>
            <div className="w-full md:w-1/2 md:p-8 flex justify-center md:justify-end">
              <img
                src="/images/circle-of-trust.svg"
                loading="lazy"
                importance="low"
                decoding="async"
                alt="Your circle of trust"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black-pure text-white py-8 sm:py-12 md:py-20 lg:py-32">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row-reverse md:-mx-6">
            <div className="w-full md:w-1/2 md:p-8 mb-8 md:mb-0">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl md:mt-4 mb-6 md:mb-8">
                  Check what you can build with Union
                </h2>
                <p className="md:text-xl leading-tight font-normal mb-6 md:mb-8">
                  Ability to give your smart contracts credit lines and more.
                </p>
                {/* <Button className="btn-full-mobile" wide>
                  Read the docs
                </Button> */}
              </div>
            </div>
            <div className="w-full md:w-1/2 md:p-8">
              <Snippet />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-4 sm:pb-10 sm:pt-20 lg:pt-32">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row sm:-mx-6">
            <div className="w-full sm:w-1/2 sm:p-8 mb-12 sm:mb-0">
              <div className="w-full"></div>
            </div>
            <div className="w-full sm:w-1/2 sm:p-8 flex self-end justify-end">
              <img
                className="w-56 sm:w-72"
                src="/images/learn-more.svg"
                alt="Learn more about Union"
                loading="lazy"
                importance="low"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}