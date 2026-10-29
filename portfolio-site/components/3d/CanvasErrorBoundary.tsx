"use client";

import { Component, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  onError?: () => void;
}

interface State {
  hasError: boolean;
}

/**
 * Class component is required here: React error boundaries only catch
 * render-phase errors thrown by class-based lifecycle hooks, which
 * function components cannot implement.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
