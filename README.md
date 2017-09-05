# polestar-utils

This is NKIA POLESTAR UI Utils.

## Installation

```sh
npm install --save-dev polestar-utils
```

## Usage

```js
import { Util, DateUtil, NumberUtil, RegExp } from 'polestar-utils';

let uuid = Util.getUUID();
```

## Util

* Util.getUUID() : UUID 리턴
* Util.sleep(milliseconds) : milliseconds 동안 sleep
* Util.setCookie(cname, cvalue, exdays, cdomain) : 쿠키 설정
* Util.getCookie(cname) : 쿠키 리턴

## DateUtil

* DateUtil.getDateToString(date) : Date 객체를 yyyy-mm-dd hh:mm:ss 문자로 변환
* DateUtil.getLastDate(date, hours) : date 를 기준으로 hours 시간만큼 이전 Date 리턴

## NumberUtil

* NumberUtil.digit(i) : "%02d" 포맷의 문자 리턴

## RegExp

* RegExp.checkEmail(strValue) : 이메일 형식 체크 true/false 리턴