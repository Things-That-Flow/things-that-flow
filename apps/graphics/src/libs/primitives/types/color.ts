// 래스터화 : 벡터 이미지(점,선,곡선 등으로 구성된 이미지)를 래스터 이미지(픽셀로 구성된 이미지)로 변환
export type RasterizationColorType = 'r' | 'g' | 'b' | 'a'

export type ColorType = Record<RasterizationColorType, number>

export type ColorParamWithOthers<P> = P & { color: ColorType }
