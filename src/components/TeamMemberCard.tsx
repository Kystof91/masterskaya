'use client';

import React, { useState } from 'react';
import { Camera, Users, X } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  experience: string;
  description: string;
  photo?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onUpdate: (updatedMember: TeamMember) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
}

export default function TeamMemberCard({ 
  member, 
  onUpdate, 
  onDelete, 
  isEditing = false 
}: TeamMemberCardProps) {
  const [isEditingLocal, setIsEditingLocal] = useState(isEditing);
  const [editedMember, setEditedMember] = useState<TeamMember>(member);

  const handleSave = () => {
    onUpdate(editedMember);
    setIsEditingLocal(false);
  };

  const handleCancel = () => {
    setEditedMember(member);
    setIsEditingLocal(false);
  };

  const handlePhotoChange = (photoPath: string) => {
    setEditedMember(prev => ({ ...prev, photo: photoPath }));
  };

  if (isEditingLocal) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-200">
        <div className="space-y-4">
          {/* Загрузка фотографии */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фотография сотрудника
            </label>
            <ImageUpload
              value={editedMember.photo || ''}
              onChange={handlePhotoChange}
              className="mb-4"
            />
          </div>

          {/* Имя */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя и отчество
            </label>
            <input
              type="text"
              value={editedMember.name}
              onChange={(e) => setEditedMember(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Должность */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Должность
            </label>
            <input
              type="text"
              value={editedMember.position}
              onChange={(e) => setEditedMember(prev => ({ ...prev, position: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Опыт */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Опыт работы
            </label>
            <input
              type="text"
              value={editedMember.experience}
              onChange={(e) => setEditedMember(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Описание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={editedMember.description}
              onChange={(e) => setEditedMember(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg card-hover">
      {/* Фотография или иконка */}
      <div className="w-24 h-24 mx-auto mb-4">
        {editedMember.photo ? (
          <div className="relative w-full h-full">
            <Image
              src={editedMember.photo}
              alt={editedMember.name}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Если изображение не загрузилось, показываем иконку
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.className = 'w-full h-full bg-primary-light rounded-full flex items-center justify-center';
                  icon.innerHTML = '<svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
                  parent.appendChild(icon);
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-primary-light rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
        )}
      </div>

      {/* Информация о сотруднике */}
      <h3 className="text-lg font-semibold text-center mb-2">{editedMember.name}</h3>
      <p className="text-primary text-center mb-2">{editedMember.position}</p>
      <p className="text-sm text-gray-500 text-center mb-3">{editedMember.experience}</p>
      <p className="text-gray-600 text-sm text-center mb-4">{editedMember.description}</p>

      {/* Кнопки редактирования */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setIsEditingLocal(true)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
        >
          <Camera className="w-3 h-3" />
          <span>Изменить</span>
        </button>
        <button
          onClick={() => onDelete(editedMember.id)}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors flex items-center space-x-1"
        >
          <X className="w-3 h-3" />
          <span>Удалить</span>
        </button>
      </div>
    </div>
  );
}
