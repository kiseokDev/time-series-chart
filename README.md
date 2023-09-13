
# 시계열 차트 그래프
서버 데이터를 기반으로 만든 시계열 차트 

요구사항
- 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프 구현
- 호버 기능 구현
- 버튼 필터링 기능 구현(특정 데이터 구역을 하이라이트)
  - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트

<br>

# 목차
  - [🔗 배포 링크](#-배포-링크)
  - [⚙️ 구현 방법](#️-구현-방법)
  - [📂 폴더 구조](#-폴더-구조)
  - [🛠️ 기술 스택](#️-기술-스택)


<br>

## 🔗 배포 링크

[https://pre-on-boarding-week2-gitissue.vercel.app/](http://time-series-chart.s3-website.ap-northeast-2.amazonaws.com/)


<br>

## ⚙️ 구현 방법
1. 배포
   - json-server aws-EC2로 배포
   - client code aws-s3로 배포
   - cicd githubAction으로 구현
2. 요구사항
  1) 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프 구현
    :  chart.js + react-chartjs-2 로 구현
  2) 호버 기능 구현
    : chart.js tooltip 옵션 사용
  3) 버튼 필터링 기능 구현(특정 데이터 구역을 하이라이트)
    : setSelectedId(id)로 필터링할 id의 상태를 저장
    : selectedId를 차트를 그리는 컴포넌트에 data 와 함께넘김 -> selectedId를 기준으로 데이터와 필터링 로직을 수행 -> 3항 연산자을 통하여 true 면 backgroundColor 색깔 변경
  4) 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트
    : 특정 데이터를 클릭시에 useRef로 해당 dom 엘리먼트를 가져오고 ChartJS에서 제공하는 함수를 통해 넘겨준 id 값에 접근 -> id를 setSelectedId(id)를 통해 변경 -> 변경된 id가 차트에 넘겨서 3) filtering 수행

       
  


<br>



## 📂 폴더 구조

```
project-root/
│
├── 📂 public/ # 정적 파일들
│
├── 📂 src/ # 소스 코드
│ ├── 📂 api/           # api 함수들
│ ├── 📂 components/    # 재사용 가능한 컴포넌트들
│ ├── 📂 hooks/         # custom hooks
│ ├── 📂 pages/         # 페이지 또는 뷰 컴포넌트
│ ├── 📂 types/         # type 관리 폴더
│ ├── 📂 util/          # 기능 함수
│ ├── 📂 App.tsx        # App 컴포넌트
│ ├── index.tsx      # 진입점 파일
├── package.json
├── tsconfig.json
└── README.md
```
<br>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=square"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-56347C?style=flat-square&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon Amplify-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>
<br>
<br>

