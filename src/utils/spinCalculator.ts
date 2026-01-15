// Easing function for realistic deceleration
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

// Calculate the final rotation angle to land on a specific segment
export function calculateTargetRotation(
  currentRotation: number,
  targetIndex: number,
  totalSegments: number,
  extraSpins: number = 5
): number {
  const segmentAngle = 360 / totalSegments
  // Target the center of the segment
  const targetAngle = targetIndex * segmentAngle + segmentAngle / 2
  
  // We want the pointer at top (0 degrees) to point to our target
  // The wheel rotates clockwise, so we need to calculate accordingly
  const baseRotation = 360 - targetAngle + 90 // 90 because pointer is at top
  
  // Add extra full rotations for dramatic effect
  const totalRotation = currentRotation + extraSpins * 360 + baseRotation
  
  // Make sure we always spin forward
  return Math.ceil(totalRotation / 360) * 360 + baseRotation
}

// Get the index of the segment at the pointer position
export function getSegmentAtPointer(rotation: number, totalSegments: number): number {
  const segmentAngle = 360 / totalSegments
  // Normalize rotation to 0-360
  const normalizedRotation = ((rotation % 360) + 360) % 360
  // Pointer is at top (270 degrees in standard position, but we use 90 for top)
  const pointerAngle = (90 - normalizedRotation + 360) % 360
  const index = Math.floor(pointerAngle / segmentAngle) % totalSegments
  return index
}

// Generate wheel colors
export function getWheelColors(count: number): string[] {
  const baseColors = [
    'var(--wheel-color-1)',
    'var(--wheel-color-2)',
    'var(--wheel-color-3)',
    'var(--wheel-color-4)',
    'var(--wheel-color-5)',
    'var(--wheel-color-6)',
    'var(--wheel-color-7)',
    'var(--wheel-color-8)',
  ]
  
  const colors: string[] = []
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length])
  }
  return colors
}

