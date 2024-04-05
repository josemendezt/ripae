import React from "react";
import ApplyButton from "./ApplyButton";

function NotesList() {
  const notes = [
    {
      value: 1500,
      interest: "7.5%",
      period: "45 Days",
      monthlyAmount: "3 installments",
      id: 1,
      url: "/noteData/pending",
    },
    // {
    //   value: 1500,
    //   interest: '10%',
    //   period: '60 Days',
    //   monthlyAmount: 'Two installments of 825',
    //   id: 2,
    // },
    {
      value: 1500,
      interest: "9.5%",
      period: "90 Days",
      monthlyAmount: "6 installments",
      id: 3,
      url: "/noteData/success",
    },
  ];

  return (
    <div className="h-full w-fit mx-auto mt-8">
      <h1 className="text-3xl font-semibold ml-6 mb-4">
        Available Loans for You
      </h1>
      <section className="rounded-lg border bg-card text-card-foreground shadow-md w-fit mx-auto p-12 ">
        <div className="text-lg mb-4 text-card-foreground w-[80vw] sm:w-full-screen">
          We have matched you with all the loans that have your requested
          amount, and we have sorted them based on your specified criteria. The
          final interest rate selected by the lender might be lower; what you
          see is the maximum allowed based on your profile.
        </div>
        <div>
          {notes.length > 0 && (
            <div className="text-center">
              <div className="flex flex-wrap gap-12 w-fit space-around items-center">
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    className="w-80 h-64 flex flex-col justify-between gap-4 pt-8 rounded-lg border bg-card text-card-foreground shadow-md"
                  >
                    <div>
                      <div>Amount</div>
                      <div className="text-4xl font-bold">{note.value}</div>
                    </div>
                    <div>
                      <div>
                        Interest up to: <strong>{note.interest}</strong>
                      </div>
                      <div>
                        Period: <strong>{note.period}</strong>
                      </div>
                      <div>
                        Payments: <strong>{note.monthlyAmount}</strong>
                      </div>
                    </div>
                    <ApplyButton link={note.url} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NotesList;
