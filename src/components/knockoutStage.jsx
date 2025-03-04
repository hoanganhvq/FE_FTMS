import React from "react";

const KnockoutStage = ({ tournament }) => {
  if (!tournament.teamsToAdvance) {
    return <p className="text-center text-red-500">Giải đấu này không có vòng đấu loại trực tiếp.</p>;
  }

  const numberOfTeamsInKnockout = tournament.teamsToAdvance;
  const roundNames = {
    16: "Vòng 1/8",
    8: "Tứ kết",
    4: "Bán kết",
    2: "Chung kết",
  };

  if (![2, 4, 8, 16].includes(numberOfTeamsInKnockout)) {
    return <p className="text-center text-red-500">Số đội không hợp lệ cho vòng knockout.</p>;
  }

  const generateKnockoutMatches = (numberOfTeams) => {
    let matches = [];
    let teamsInCurrentRound = Array.from({ length: numberOfTeams }, (_, i) => ({
      name: `Đội #${i + 1}`,
      logo: "https://via.placeholder.com/30",
    }));

    let finalWinner = null;

    while (teamsInCurrentRound.length > 1) {
      let roundMatches = [];
      let winners = [];
      for (let i = 0; i < teamsInCurrentRound.length; i += 2) {
        let team1 = teamsInCurrentRound[i];
        let team2 = teamsInCurrentRound[i + 1];
        let score1 = Math.floor(Math.random() * 5);
        let score2 = Math.floor(Math.random() * 5);
        let penalty1 = null;
        let penalty2 = null;

        if (score1 === score2) {
          penalty1 = Math.floor(Math.random() * 5 + 1);
          penalty2 = Math.floor(Math.random() * 5 + 1);
        }

        let winner =
          score1 > score2 || (score1 === score2 && penalty1 >= penalty2)
            ? team1
            : team2;

        winners.push(winner);
        roundMatches.push({
          roundName: roundNames[teamsInCurrentRound.length] || `Vòng ${teamsInCurrentRound.length}`,
          team1,
          team2,
          score1,
          score2,
          penalty1,
          penalty2,
          stadium: `Sân #${i / 2 + 1}`,
          matchTime: `${Math.floor(Math.random() * 10) + 14}:00`,
          winner,
        });
      }
      matches.push(roundMatches);
      teamsInCurrentRound = winners;
      if (teamsInCurrentRound.length === 1) {
        finalWinner = teamsInCurrentRound[0];
      }
    }
    return { matches, finalWinner };
  };

  const { matches: knockoutMatches, finalWinner } = generateKnockoutMatches(numberOfTeamsInKnockout);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl text-white overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Vòng Knockout - {tournament.name}
      </h2>
      <div className="flex justify-center items-start space-x-10 relative">
        {knockoutMatches.map((round, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <h3 className="text-lg font-semibold text-yellow-300 mb-4">{round[0]?.roundName}</h3>
            {round.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="relative flex flex-col bg-green-300 border border-green-500 p-2 rounded-lg shadow-md w-80 mb-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img src={match.team1.logo} alt="Logo" className="w-8 h-8" />
                    <span className="text-black font-medium">{match.team1.name}</span>
                  </div>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                    {match.score1} - {match.score2}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-black font-medium">{match.team2.name}</span>
                    <img src={match.team2.logo} alt="Logo" className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-center text-black font-semibold mt-2">
                  🏟 {match.stadium} - ⏰ {match.matchTime}
                </div>
                {match.penalty1 !== null && (
                  <div className="text-center text-red-600 font-bold mt-1">
                    Pen: {match.penalty1} - {match.penalty2}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {finalWinner && (
          <div className="flex flex-col items-center relative">
            <h3 className="text-2xl font-bold text-yellow-400 mt-8">🏆 Nhà vô địch</h3>
            <div className="flex flex-col items-center bg-yellow-500 border border-yellow-600 p-4 rounded-xl shadow-lg mt-4 w-80">
              <img src={finalWinner.logo} alt="Logo" className="w-16 h-16 mb-2" />
              <span className="text-black font-bold text-lg">{finalWinner.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnockoutStage;
