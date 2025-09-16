import { useState } from 'react';
import { DnD } from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DnD.Provider> = {
  title: 'DnD',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FileManager: Story = {
  render: () => (
    <DnD.Provider>
      <DnD.Boundary width="600px" height="500px">
        <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
          {/* File List */}
          <div style={{ flex: 1, padding: '20px' }}>
            <h3 style={{ marginBottom: '16px', color: '#495057' }}>Files</h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {[
                { name: 'document.pdf', type: 'pdf', color: '#dc3545' },
                { name: 'image.jpg', type: 'image', color: '#28a745' },
                { name: 'video.mp4', type: 'video', color: '#6f42c1' },
                { name: 'archive.zip', type: 'archive', color: '#fd7e14' },
                { name: 'code.js', type: 'code', color: '#20c997' },
              ].map((file, index) => (
                <DnD.SingleDraggable
                  key={index}
                  etcStyles={{
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    cursor: 'grab',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {({ isDrag }) => (
                    <div
                      style={{
                        opacity: isDrag ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: file.color,
                          borderRadius: '2px',
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#495057' }}>
                        {file.name}
                      </span>
                    </div>
                  )}
                </DnD.SingleDraggable>
              ))}
            </div>
          </div>

          {/* Folders */}
          <div style={{ flex: 1, padding: '20px' }}>
            <h3 style={{ marginBottom: '16px', color: '#495057' }}>Folders</h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {[
                { name: 'Documents', icon: '📁', color: '#007bff' },
                { name: 'Images', icon: '🖼️', color: '#28a745' },
                { name: 'Videos', icon: '🎥', color: '#6f42c1' },
                { name: 'Downloads', icon: '⬇️', color: '#fd7e14' },
              ].map((folder, index) => (
                <DnD.Droppable
                  key={index}
                  dropAction={(e) => {
                    e.preventDefault();
                  }}
                  etcStyles={{
                    minHeight: '60px',
                    border: '2px dashed #dee2e6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#f8f9fa',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {({ isDragEnter }) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        color: isDragEnter ? folder.color : '#6c757d',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{folder.icon}</span>
                      <span style={{ fontWeight: '600' }}>
                        {isDragEnter
                          ? `📁 Drop in ${folder.name}`
                          : folder.name}
                      </span>
                    </div>
                  )}
                </DnD.Droppable>
              ))}
            </div>
          </div>
        </div>

        <DnD.PointerContent
          customStyle={(mouseX, mouseY) => ({
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '4px 8px',
          })}
        />
      </DnD.Boundary>
    </DnD.Provider>
  ),
};

export const KanbanBoard: Story = {
  render: () => {
    const [tasks, setTasks] = useState({
      'To Do': ['Task 1', 'Task 2'],
      'In Progress': ['Task 3'],
      Done: ['Task 4', 'Task 5'],
    });

    const [draggedTask, setDraggedTask] = useState<{
      task: string;
      sourceColumn: string;
    } | null>(null);

    const handleDragStart = (task: string, sourceColumn: string) => {
      setDraggedTask({ task, sourceColumn });
    };

    const handleDrop = (e: React.DragEvent, targetColumn: string) => {
      e.preventDefault();

      if (!draggedTask) return;

      const { task, sourceColumn } = draggedTask;

      // 같은 컬럼에 드롭한 경우 아무것도 하지 않음
      if (sourceColumn === targetColumn) {
        setDraggedTask(null);
        return;
      }

      // 태스크 이동
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        // 소스 컬럼에서 태스크 제거
        newTasks[sourceColumn as keyof typeof newTasks] = newTasks[
          sourceColumn as keyof typeof newTasks
        ].filter((t: string) => t !== task);
        // 타겟 컬럼에 태스크 추가
        newTasks[targetColumn as keyof typeof newTasks] = [
          ...newTasks[targetColumn as keyof typeof newTasks],
          task,
        ];

        return newTasks;
      });

      setDraggedTask(null);
    };

    const columns = [
      { title: 'To Do', color: '#6c757d' },
      { title: 'In Progress', color: '#007bff' },
      { title: 'Done', color: '#28a745' },
    ];

    return (
      <DnD.Provider>
        <DnD.Boundary width="600px" height="400px">
          <div
            style={{
              display: 'flex',
              gap: '16px',
              height: '100%',
              padding: '20px',
            }}
          >
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} style={{ flex: 1 }}>
                <h3
                  style={{
                    marginBottom: '16px',
                    color: column.color,
                    textAlign: 'center',
                    padding: '8px',
                    backgroundColor: `${column.color}20`,
                    borderRadius: '8px',
                  }}
                >
                  {column.title} (
                  {tasks[column.title as keyof typeof tasks].length})
                </h3>
                <DnD.Droppable
                  dropAction={(e) => handleDrop(e, column.title)}
                  etcStyles={{
                    minHeight: '300px',
                    border: '2px dashed #dee2e6',
                    borderRadius: '8px',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {({ isDragEnter }) => (
                    <>
                      {tasks[column.title as keyof typeof tasks].map(
                        (item: string, itemIndex: number) => (
                          <DnD.SingleDraggable
                            key={`${column.title}-${item}-${itemIndex}`}
                            dragAction={() =>
                              handleDragStart(item, column.title)
                            }
                            etcStyles={{
                              padding: '12px',
                              backgroundColor: 'white',
                              border: '1px solid #dee2e6',
                              borderRadius: '6px',
                              cursor: 'grab',
                              userSelect: 'none',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {({ isDrag }) => (
                              <div
                                style={{
                                  opacity: isDrag ? 0.5 : 1,
                                  transition: 'opacity 0.2s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <span>{item}</span>
                                <span
                                  style={{ fontSize: '12px', color: '#6c757d' }}
                                >
                                  {column.title}
                                </span>
                              </div>
                            )}
                          </DnD.SingleDraggable>
                        )
                      )}
                      {isDragEnter && draggedTask && (
                        <div
                          style={{
                            padding: '12px',
                            backgroundColor: `${column.color}20`,
                            border: `2px dashed ${column.color}`,
                            borderRadius: '6px',
                            textAlign: 'center',
                            color: column.color,
                            fontWeight: '600',
                            animation: 'pulse 1s infinite',
                          }}
                        >
                          Drop "{draggedTask.task}" here
                        </div>
                      )}
                      {tasks[column.title as keyof typeof tasks].length ===
                        0 && (
                        <div
                          style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#6c757d',
                            fontStyle: 'italic',
                            border: '2px dashed #dee2e6',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                          }}
                        >
                          No tasks in {column.title}
                        </div>
                      )}
                    </>
                  )}
                </DnD.Droppable>
              </div>
            ))}
          </div>

          <DnD.PointerContent
            customStyle={(mouseX, mouseY) => ({
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              padding: '8px 12px',
              transform: `translate(${mouseX}px, ${mouseY}px) rotate(5deg)`,
            })}
          />

          {/* CSS 애니메이션 추가 */}
          <style>
            {`
              @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
              }
            `}
          </style>
        </DnD.Boundary>
      </DnD.Provider>
    );
  },
};
