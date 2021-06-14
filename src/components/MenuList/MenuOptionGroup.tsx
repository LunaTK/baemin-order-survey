import { Checkbox, message, Radio } from 'antd';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateOption } from 'src/actions';
import { IOptionGroup } from 'src/types/baemin';

const radioStyle = {
  display: 'block',
  // height: '30px',
  // lineHeight: '30px',
};

const mapDispatch = {
  updateOption,
};

const connector = connect(null, mapDispatch);

type SelectType = number[];
type MenuOptionGroupProps = ConnectedProps<typeof connector> & {
  optionGroup: IOptionGroup;
  selected: SelectType;
};

const OptionTitle: React.FC<{
  optionGroup: IOptionGroup;
  isRadio: boolean;
}> = ({ optionGroup, isRadio }) => (
  <h3>
    {optionGroup.name}
    {!isRadio && ` (최대 : ${optionGroup.maxOrderableQuantity} 개)`}
  </h3>
);

const MenuOptionGroup: React.FC<MenuOptionGroupProps> = ({ optionGroup, updateOption, selected }) => {
  const { options, minOrderableQuantity, maxOrderableQuantity } = optionGroup;

  const isRadio = maxOrderableQuantity === minOrderableQuantity && maxOrderableQuantity === 1;
  const checkOptions = useMemo(
    () =>
      options.map((o) => ({
        label: `${o.name} (${o.price} 원)`,
        value: o.optionId,
      })),
    [options],
  );

  const onOptionEvent = (selected: any) => {
    // 옵션 선택 가능 갯수 검증
    if (!isRadio && selected.length > maxOrderableQuantity) {
      message.warning('최대 선택 가능 갯수를 초과합니다');
      return;
    }

    updateOption({
      optionGroupId: optionGroup.optionGroupId,
      name: optionGroup.name,
      selected: isRadio ? [selected] : selected, // 라디오버튼 선택값은 리스트로 래핑해서 보낸다
    });
  };

  const OptionGroup = isRadio ? Radio.Group : Checkbox.Group;
  const OptionComponent = isRadio ? Radio : Checkbox;

  return (
    <>
      <OptionTitle optionGroup={optionGroup} isRadio={isRadio} />

      <OptionGroup
        options={!isRadio ? checkOptions : undefined}
        value={isRadio ? selected[0] : selected}
        onChange={(e: any) => onOptionEvent(isRadio ? e.target.value : e)}
      >
        {isRadio &&
          options.map((o) => (
            <OptionComponent key={o.optionId} style={isRadio ? radioStyle : {}} value={o.optionId}>
              {o.name}
              {!!o.price && `(${o.price}원)`}
            </OptionComponent>
          ))}
      </OptionGroup>
    </>
  );
};

export default connector(MenuOptionGroup);
