// @flow
import * as React from 'react'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'

import {
  Flex,
  Box,
  Tooltip,
  useHoverTooltip,
  Icon,
  ALIGN_CENTER,
  SIZE_2,
  SPACING_1,
  SPACING_2,
  C_LIGHT_GRAY,
  C_DARK_GRAY,
  BORDER_SOLID_MEDIUM,
} from '@opentrons/components'

import { selectors as stepFormSelectors } from '../../../step-forms'
import { getMultiSelectItemIds } from '../../../ui/steps'

import type { IconName } from '@opentrons/components'

type ClickableIconProps = {
  iconName: IconName,
  tooltipText: string,
  width?: string,
  alignRight?: boolean,
  isLast?: boolean,
}

const iconBoxStyles = css`
  align-self: stretch;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${C_LIGHT_GRAY};
  }
`

export const ClickableIcon = (props: ClickableIconProps): React.Node => {
  const { iconName, tooltipText, width } = props
  const [targetProps, tooltipProps] = useHoverTooltip({
    placement: 'top',
  })

  const boxStyles = {
    padding: SPACING_1,
    marginLeft: props.alignRight ? 'auto' : 0,
  }

  return (
    <Box {...boxStyles} {...targetProps} css={iconBoxStyles}>
      <Tooltip {...tooltipProps}>{tooltipText}</Tooltip>
      <Icon name={iconName} width={width || '1.25rem'} color={C_DARK_GRAY} />
    </Box>
  )
}

export const MultiSelectToolbar = (): React.Node => {
  const stepCount = useSelector(stepFormSelectors.getOrderedStepIds).length
  const selectedStepCount = useSelector(getMultiSelectItemIds)?.length
  const isAllStepsSelected = stepCount === selectedStepCount

  const selectProps = {
    iconName: isAllStepsSelected ? 'checkbox-marked' : 'minus-box',
    tooltipText: isAllStepsSelected ? 'deselect' : 'select',
  }

  const deleteProps = {
    iconName: 'delete',
    tooltipText: 'delete',
    width: '1.5rem',
    alignRight: true,
  }

  const copyProps = {
    iconName: 'content-copy',
    tooltipText: 'duplicate',
  }

  const expandProps = {
    iconName: 'unfold-less-horizontal',
    tooltipText: 'collapse',
    isLast: true,
  }

  return (
    <Flex
      alignItems={ALIGN_CENTER}
      height={SIZE_2}
      padding={`0 ${SPACING_2}`}
      borderBottom={BORDER_SOLID_MEDIUM}
    >
      <ClickableIcon {...selectProps} />
      <ClickableIcon {...deleteProps} />
      <ClickableIcon {...copyProps} />
      <ClickableIcon {...expandProps} />
    </Flex>
  )
}
