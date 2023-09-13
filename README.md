
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

### 1. 배포

- **json-server:** AWS EC2를 사용하여 배포하였습니다.
- **Client Code:** AWS S3를 이용해 배포하였습니다.
- **CI/CD:** GitHub Actions을 활용하여 구현하였습니다.

### 2. 요구사항 및 구현 방식

#### 1) 복합 그래프 구현

하나의 차트 내에서 Area 형태의 그래프와 Bar 형태의 그래프를 모두 포함하도록 하였습니다.
- 구현 도구: `chart.js`와 `react-chartjs-2`

#### 2) 호버 기능

사용자가 차트의 항목 위에 마우스를 올리면, 해당 항목에 대한 정보를 표시합니다.
- 구현 방식: `chart.js`의 tooltip 옵션을 활용

#### 3) 버튼 필터링 기능

특정 데이터 구역을 하이라이트하는 기능을 포함하였습니다.
- `setSelectedId(id)` 함수를 사용하여 필터링할 id의 상태를 저장
- 저장된 `selectedId` 상태를 차트 컴포넌트에 data와 함께 전달
- `selectedId`를 기준으로 데이터 필터링을 수행하고, 필터링 결과에 따라 배경색상 변경 (3항 연산자 활용)

#### 4) 데이터 구역 클릭 기능

차트의 특정 데이터 구역을 클릭할 때, 동일한 ID 값을 가진 데이터 구역을 하이라이트합니다.
- 클릭한 데이터에 `useRef`를 사용하여 해당 DOM 엘리먼트에 접근
- ChartJS에서 제공하는 함수를 통해 넘겨받은 id 값에 접근
- `setSelectedId(id)` 함수를 사용하여 id를 변경하고, 변경된 id를 차트에 전달하여 필터링 수행

       
  


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

