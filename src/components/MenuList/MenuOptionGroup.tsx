import { Checkbox, message, Radio } from 'antd';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateOption } from 'src/actions';
import { IOptionGroup } from 'src/types/common';

const radioStyle = {
  display: 'block',
  // height: '30px',
  // lineHeight: '30px',
};

const mapDispatch = {
  updateOption,
};

const connector = connect(null, mapDispatch);

type MenuOptionGroupProps = ConnectedProps<typeof connector> & {
  optionGroup: IOptionGroup;
};

const OptionTitle: React.FC<{
  optionGroup: IOptionGroup,
  isRadio: boolean,
}> = ({optionGroup, isRadio}) => (
  <h3>
    { optionGroup.name }
    { !isRadio && ` (최대 : ${optionGroup.maxOrderableQuantity} 개)` }
  </h3>);

const MenuOptionGroup: React.FC<MenuOptionGroupProps> = ({ optionGroup, updateOption }) => {
  type SelectType = number | CheckboxValueType[];
  const { 
    options,
    minOrderableQuantity, 
    maxOrderableQuantity,
  } = optionGroup;
  const isRadio = maxOrderableQuantity === minOrderableQuantity && maxOrderableQuantity === 1;

  const [selected, setSelected] = useState<SelectType>(isRadio ? options[0].optionId : []);
  const [checkOptions, setCheckOptions] = useState<CheckboxOptionType[]>([]);
  const _onChange = (selected: any) => {
    // 옵션 선택 가능 갯수 검증
    if (!isRadio && selected.length > maxOrderableQuantity) {
      message.warning('최대 선택 가능 갯수를 초과합니다');
      return;
    }

    // 라디오버튼 선택값은 리스트로 래핑해서 보낸다
    const _selected = isRadio ? [selected] : selected;
    setSelected(selected);
    updateOption({
      optionGroupId: optionGroup.optionGroupId,
      name: optionGroup.name,
      selected: _selected, // 라디오버튼 선택값은 리스트로 래핑해서 보낸다
    });
  };

  useEffect(() => {
    if (isRadio) {
      _onChange(options[0].optionId); //라디오 초깃값 store에 업데이트
    } else {
      setCheckOptions(options.map(o => ({
        label: `${o.name} (${o.price} 원)`,
        value: o.optionId,
      })));
    }
  }, [isRadio, options]);

  const OptionGroup = isRadio ? Radio.Group : Checkbox.Group;
  const OptionComponent = isRadio ? Radio : Checkbox;

  return (
    <>
      <OptionTitle optionGroup={optionGroup} isRadio={isRadio}/>

      <OptionGroup
        options={ !isRadio ? checkOptions : undefined }
        value={selected}
        onChange={(e:any) => _onChange(isRadio ? e.target.value : e)}
      >
        { isRadio && options.map(o => (
          <OptionComponent 
            style={isRadio ? radioStyle : {}} 
            value={o.optionId}
          >
            {o.name}{!!o.price && `(${o.price}원)`}
          </OptionComponent>
        ))}
      </OptionGroup>
    </>
  );
};

export default connector(MenuOptionGroup);