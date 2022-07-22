// Bulls and Cows

// 시작 > 숫자 4개(1~9) 뽑기 > 대기
// 답안 제출
// 형식에 맞는지 확인 > 아니오 > 에러 표시 > 대기
// 형식에 맞는지 확인 > 예
// 답안 확인 > 홈런 > 승리문구 > 끝
// 답안 확인 > 홈런X > 스트볼여부확인 > 알려주기 > 시도횟수 1회 증가
//                                  > 0스트 0볼일 경우 out 문구 > out 횟수 1회 증가
//                                                            > out 3회일 경우 실패 > 끝
// 반복 시도횟수 10회 초과되면 게임 종료 > 실패 문구 > 끝

const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

// 1 ~ 9 까지의 숫자 배열에 담기
const numbers = [];
for (let n = 0; n < 9; n += 1) {
  numbers.push(n + 1);
}

// 랜덤한 4개의 숫자 뽑기
// answer 4 [a, b, c, d] // numbers에서 4개 추출, 추출된 것 삭제
// numbers[index]
const answer = [];
for (let i = 0; i < 4; i += 1) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

// 답안 제출하기
const tries = [];

// 형식에 맞는지 확인
function checkInput(input) {
  if (input.includes(0)) {
    return alert("1~9 사이의 숫자를 입력해주세요!");
  }
  if (input.length !== 4) {
    return alert("네자리 숫자를 입력해주세요!");
  }
  if (new Set(input).size !== 4) {
    return alert("숫자가 중복되었습니다. 다시 입력해주세요!");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값입니다!");
  }
  return true;
}

// 답안 확인
const defeat = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
let out = 0;

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $input.value; // 입력값 변수에 저장
  $input.value = "";
  if (!checkInput(value)) {
    return;
  }
  if (answer.join("") === value) {
    $logs.textContent = "HOMERUN!!";
    return;
  }
  if (tries.length >= 9) {
    $logs.append(defeat);
    return;
  }
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike++;
      } else {
        ball++;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${out} 아웃!`, document.createElement("br"));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }
  if (out === 3) {
    $logs.append(defeat);
  }
  tries.push(value);
});
