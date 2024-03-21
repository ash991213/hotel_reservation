import { Res } from '@libs/utils/common/res/res.interface';

// * common
export const SUCCESS: Res = { code: 0, message: '성공' };
export const INVALID_PARAM: Res = { code: 1, message: '잘못된 파라미터 입니다.' };
export const INTERNAL_SERVER_ERROR: Res = { code: 2, message: '내부 서버 오류가 발생했습니다.' };
export const WRONG_APPROACH: Res = { code: 3, message: '요청 경로를 찾을 수 없습니다.' };
export const NOT_HAVE_ACCESS: Res = { code: 4, message: '접근 권한이 없습니다.' };
export const BAD_GATEWAY: Res = { code: 5, message: '요청 리소스에 연결할 수 없습니다.' };
export const GATEWAY_TIMEOUT: Res = { code: 6, message: '요청 시간이 초과 되었습니다.' };
export const UNAUTHORIZED_ERROR: Res = { code: 7, message: '인증되지 않은 요청입니다.' };

// * database
export const DB_CONNECTION_FAILED: Res = { code: 1001, message: '데이터베이스에 연결을 실패하였습니다.' };
export const DB_SELECT_FAILED: Res = { code: 1002, message: '데이터베이스에 데이터를 불러오는데 실패했습니다.' };
export const DB_INSERT_FAILED: Res = { code: 1003, message: '데이터베이스에 데이터를 생성하는데 실패했습니다.' };
export const DB_UPDATE_FAILED: Res = { code: 1004, message: '데이터베이스에 데이터를 변경하는데 실패했습니다.' };
export const DB_DELETE_FAILED: Res = { code: 1005, message: '데이터베이스에 데이터를 제거하는데 실패했습니다.' };

// * redis
export const REDIS_CONNECTION_FAILED: Res = { code: 2001, message: '캐시 서버에 연결을 실패했습니다.' };
export const DB_GET_FAILED: Res = { code: 2002, message: '캐시 서버에 데이터를 불러오는데 실패했습니다.' };
export const REDIS_SET_FAILED: Res = { code: 2003, message: '캐시 서버에 데이터를 저장하는데 실패했습니다.' };
export const REDIS_DELETE_FAILED: Res = { code: 2004, message: '캐시 서버에 데이터를 삭제하는데 실패했습니다.' };
export const REDIS_SET_EXPIRED_FAILED: Res = { code: 2005, message: '캐시 서버에 데이터의 만료 기간을 설정하는데 실패했습니다.' };

// * hotel
export const HOTEL_SELECT_FAILED: Res = { code: 3001, message: '해당 호텔 정보를 조회하는데 실패했습니다.' };
export const HOTEL_CREATE_FAILED: Res = { code: 3002, message: '호텔 정보를 추가하는데 실패했습니다.' };
export const HOTEL_UPDATE_FAILED: Res = { code: 3003, message: '호텔 정보를 변경하는데 실패했습니다.' };
export const HOTEL_DELETE_FAILED: Res = { code: 3003, message: '호텔 정보를 삭제하는데 실패했습니다.' };
