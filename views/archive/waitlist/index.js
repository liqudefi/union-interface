import { Fragment } from "react";
import WaitlistSignupForm from "./waitlistSignupForm";

export default function WaitlistView() {
  return (
    <Fragment>
      <section className="pt-12 md:pt-24">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row sm:space-x-16">
            <div className="w-full sm:w-2/3">
              <div className="w-full">
                <WaitlistSignupForm />
              </div>
            </div>
            <div className="hidden sm:flex w-full self-end sm:w-1/3 justify-end">
              <img
                className="w-56 sm:w-72"
                src="/images/learn-more.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 md:pt-24">
        <div className="container-sm">
          <div className="divider"></div>
        </div>
      </section>

      <section className="pt-12 md:pt-24">
        <div className="container-sm">
          <div className="md:flex md:space-x-16 space-y-8 md:space-y-0">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Trusted lending
              </h3>
              <p className="sm:text-lg">
                Lend your crypto assets to your friends and earn interest with
                every repayment.{" "}
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Borrowing simplified
              </h3>
              <p className="sm:text-lg">
                Easily borrow cash on the fly from the friends who trust you,
                without collateral.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Governed by you
              </h3>
              <p className="sm:text-lg">
                There's no corporation controlling Union, the entire protocol is
                owned and operated by its users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 md:pt-24">
        <div className="container-sm overflow-hidden">
          <div className="max-w-4xl mx-auto -mb-12">
            <img
              alt=""
              className="radius-app shadow-app"
              importance="low"
              loading="lazy"
              src="/images/app.svg"
            />
          </div>
        </div>
      </section>

      <section className="border-t bg-white pt-12 md:pt-24 pb-0 sm:pb-12 md:pb-24">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row sm:space-x-16">
            <div className="w-full sm:w-2/3"></div>
            <div className="w-full self-end sm:w-1/3 flex justify-end">
              <img
                className="w-56 sm:w-72"
                src="/images/together-flipped.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}